const _ = require('underscore');
const lodashGet = require('lodash/get');
const { PROP_TYPE_REQUIRED_FALSE, PROP_TYPE_NOT_DECLARED, PROP_DEEFAULT_NOT_DECLARED, HAVE_PROP_TYPES, HAVE_DEFAULT_PROPS, ONYX_ONE_PARAM } = require('./CONST').MESSAGE

module.exports = {
    create(context) {
        return {
            CallExpression(node) {
                // Filter the function call by name
                const name = lodashGet(node, 'callee.name');
                if (!name) {
                    return;
                }
                // console.log(JSON.stringify(node))
                if (name !== 'withOnyx') {
                    return;
                }

                if (node.arguments.length === 0) {
                    context.report({
                        node,
                        message: ONYX_ONE_PARAM
                    });
                }

                // Get all the tree ancestors
                let ancestors = context.getAncestors();
                console.log( ancestors[0].type)

                console.log( ancestors[0].body[0].declarations[0].id.name)

                // Get the propTypes declaration node
                const propTypes = _.find(
                    ancestors[0].body, // Top level Node, Program 
                    n => lodashGet(n, "type") === 'VariableDeclaration'
                        && lodashGet(n, "declarations[0].id.name") === 'propTypes'
                );

                if (!propTypes) {
                    context.report({
                        node,
                        message: HAVE_PROP_TYPES
                    });
                    return;
                }

                // Get the defaultProps declaration node
                const defaultProps = _.find(
                    ancestors[0].body, // Top level Node, Program 
                    n => lodashGet(n, "type") === 'VariableDeclaration'
                        && lodashGet(n, "declarations[0].id.name") === 'defaultProps'
                );

                if (!defaultProps) {
                    context.report({
                        node,
                        message: HAVE_DEFAULT_PROPS,
                    });
                    return;
                }

                // Get the list of properties of withOnyx
                let onyxProperties = lodashGet(node, 'arguments[0].properties');

                _.forEach(onyxProperties, (property) => {
                    let onyxKeyName = lodashGet(property, 'key.name');
                    let declaredPropType = _.find(propTypes.declarations[0].init.properties, p => p.type === "Property" && lodashGet(p, "key.name") === onyxKeyName);
                    let defaultPropType = _.find(defaultProps.declarations[0].init.properties, p =>  p.type === "Property" && lodashGet(p, "key.name") === onyxKeyName);

                    if (declaredPropType) {
                        if (lodashGet(declaredPropType, "value.type") === 'MemberExpression') {
                            if (lodashGet(declaredPropType, "value.property.name") === 'isRequired') {
                                context.report({
                                    node,
                                    message: PROP_TYPE_REQUIRED_FALSE,
                                    data: {
                                        key: onyxKeyName
                                    }
                                })
                            }
                        } else if (lodashGet(declaredPropType, "value.type") === 'CallExpression') {
                            // Signifies existence of key but does not have .isRequired
                        } else if (lodashGet(declaredPropType, "value.type") === 'Identifier') {
                            // Signifies existence of key but does not have .isRequired
                        }
                    } else {
                        context.report({
                            node,
                            message: PROP_TYPE_NOT_DECLARED,
                            data: {
                                key: onyxKeyName
                            }
                        })
                    }

                    if (!defaultPropType) {
                        context.report({
                            node,
                            message: PROP_DEEFAULT_NOT_DECLARED,
                            data: {
                                key: onyxKeyName
                            }
                        })
                    }
                });
            },
        };
    },
};