const RuleTester = require('eslint').RuleTester;
const rule = require('../with-onyx-component-should-have-default-props');
const { PROP_TYPE_REQUIRED_FALSE, PROP_TYPE_NOT_DECLARED, PROP_DEEFAULT_NOT_DECLARED, HAVE_PROP_TYPES, HAVE_DEFAULT_PROPS } = require('../CONST')

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
});

ruleTester.run('with-onyx-component-should-have-default-props', rule, {
    invalid: [
        // onyxProp has isRequired
        // {
        //     code: `const propTypes = {
        //         size: PropTypes.string,
        //         policies: PropTypes.objectOf(policyPropTypes.policy).isRequired,
        //         cardList: PropTypes.objectOf(cardPropTypes),
        //         userWallet: userWalletPropTypes,
        //     }
        //     const defaultProps = {
        //         policies: {},
        //         cardList: {},
        //         userWallet: {},
        //     };
        //     export default withOnyx({
        //         policies: {
        //             key: ONYXKEYS.COLLECTION.POLICY,
        //         },
        //         cardList: {
        //             key: ONYXKEYS.CARD_LIST,
        //         },})(component);
        //     `,
        //     errors: [{
        //         PROP_TYPE_REQUIRED_FALSE
        //     }],
        // },
        // // onyxProp not declared in propTypes
        // {
        //     code: `const propTypes = {
        //         size: PropTypes.string,
        //         cardList: PropTypes.objectOf(cardPropTypes),
        //         userWallet: userWalletPropTypes,
        //     }
        //     const defaultProps = {
        //         policies: {},
        //         cardList: {},
        //         userWallet: {},
        //     };
        //     export default withOnyx({
        //         policies: {
        //             key: ONYXKEYS.COLLECTION.POLICY,
        //         },
        //         cardList: {
        //             key: ONYXKEYS.CARD_LIST,
        //         },})(component);
        //     `,
        //     errors: [{
        //         PROP_TYPE_NOT_DECLARED
        //     }],
        // },
        // // onyxProp has no default prop
        // {
        //     code: `const propTypes = {
        //         size: PropTypes.string,
        //         policies: PropTypes.objectOf(policyPropTypes.policy),
        //         cardList: PropTypes.objectOf(cardPropTypes),
        //         userWallet: userWalletPropTypes,
        //     }
        //     const defaultProps = {
        //         cardList: {},
        //         userWallet: {},
        //     };
        //     export default withOnyx({
        //         policies: {
        //             key: ONYXKEYS.COLLECTION.POLICY,
        //         },
        //         cardList: {
        //             key: ONYXKEYS.CARD_LIST,
        //         },})(component);
        //     `,
        //     errors: [{
        //         PROP_DEEFAULT_NOT_DECLARED
        //     }],
        // },
        // // component has no prop types
        // {
        //     code: `
        //     const defaultProps = {
        //         cardList: {},
        //         userWallet: {},
        //     };
        //     export default withOnyx({
        //         policies: {
        //             key: ONYXKEYS.COLLECTION.POLICY,
        //         },
        //         cardList: {
        //             key: ONYXKEYS.CARD_LIST,
        //         },})(component);
        //     `,
        //     errors: [{
        //         HAVE_PROP_TYPES
        //     }],
        // },
        // // component has no default prop values
        // {
        //     code: `
        //     const propTypes = {
        //         size: PropTypes.string,
        //         policies: PropTypes.objectOf(policyPropTypes.policy),
        //         cardList: PropTypes.objectOf(cardPropTypes),
        //         userWallet: userWalletPropTypes,
        //     }
        //     export default withOnyx({
        //         policies: {
        //             key: ONYXKEYS.COLLECTION.POLICY,
        //         },
        //         cardList: {
        //             key: ONYXKEYS.CARD_LIST,
        //         },})(component);
        //     `,
        //     errors: [{
        //         HAVE_DEFAULT_PROPS
        //     }],
        // },
    ],
    valid: [
        // {
        //     code: `
        //     const propTypes = {
        //         size: PropTypes.string,
        //         policies: PropTypes.objectOf(policyPropTypes.policy),
        //         cardList: PropTypes.objectOf(cardPropTypes),
        //         userWallet: userWalletPropTypes,
        //     }
        //     const defaultProps = {
        //         policies: {},
        //         cardList: {},
        //         userWallet: {},
        //     };
        //     export default withOnyx({
        //         policies: {
        //             key: ONYXKEYS.COLLECTION.POLICY,
        //         },
        //         cardList: {
        //             key: ONYXKEYS.CARD_LIST,
        //         },})(component);
        //     `,
        // },
        {
            code: `
            const propTypes = {
                size: PropTypes.string,
                policies: PropTypes.objectOf(policyPropTypes.policy),
                cardList: PropTypes.objectOf(cardPropTypes),
                userWallet: userWalletPropTypes,
            }
            const defaultProps = {
                policies: {},
                cardList: {},
                userWallet: {},
            };
            export default compose(
                withLocalize,
                withWindowDimensions,
                withPolicy,
                withNetwork(),
                withOnyx({
                    policies: {
                        key: ONYXKEYS.COLLECTION.POLICY,
                    },
                    cardList: {
                        key: ONYXKEYS.CARD_LIST,
                    },
                })
            )(component);
            `,
        },
    ],
});