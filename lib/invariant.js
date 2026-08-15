//#region lib/types/invariant.js
/**
* Package-owned invariant companion for `@ticoguo/dsh-balance-check`.
* @module @ticoguo/dsh-balance-check/invariant
*/
const PACKAGE_NAME = "@ticoguo/dsh-balance-check";
/** Cordis companion plugin name. */
const name = "balance-check-invariant";
/** Service required before the companion can reserve package ownership. */
const inject = ["invariants"];
/**
* No runtime invariant: the plugin owns one HTTP route and one settings
* namespace, both registered and unwound inside single effects on the plugin
* fiber, so their lifecycle relation is asserted by the plugin's own load and
* disposal rather than by an observable event stream.
*/
const install = () => {};
/**
* Register this package's invariant companion.
* @param ctx - Cordis context carrying the invariant service.
* @returns the installed registration's disposer after setup succeeds.
*/
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//#endregion
export { apply, inject, name };
