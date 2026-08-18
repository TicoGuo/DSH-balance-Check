window.__ModuleLoader__.load({
	id: "@ticoguo/dsh-balance-check",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region \0dsh-css:src\client\BalanceButton.module.css.mjs
		const css$1 = "._5NXgpa_root{display:inline-flex;position:relative}._5NXgpa_trigger{height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:24px;align-items:center;gap:4px;padding:0 4px 0 8px;font-size:13px;line-height:20px;transition:background-color .12s,border-color .12s;display:inline-flex}._5NXgpa_trigger:hover{background:var(--dsw-alias-interactive-bg-hover)}._5NXgpa_triggerError{color:var(--dsw-alias-state-error-primary)}._5NXgpa_label{font-variant-numeric:tabular-nums;font-weight:500}._5NXgpa_labelError{font-weight:700}._5NXgpa_popover{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);width:264px;max-width:calc(100vw - 24px);color:var(--dsw-alias-label-primary);box-shadow:var(--dsw-shadow-lv3,0 8px 24px #00000059);z-index:1000;box-sizing:border-box;overscroll-behavior:contain;border-radius:10px;padding:12px;position:fixed;overflow-y:auto}._5NXgpa_head{justify-content:space-between;align-items:center;margin-bottom:10px;display:flex}._5NXgpa_available,._5NXgpa_unavailable{border-radius:10px;padding:2px 8px;font-size:11px;font-weight:600}._5NXgpa_available{background:var(--dsw-alias-state-success-tertiary);color:var(--dsw-alias-state-success-primary)}._5NXgpa_unavailable{color:var(--dsw-alias-state-error-primary);background:#f851492e}._5NXgpa_currency{opacity:.6;font-size:11px}._5NXgpa_headRight{align-items:center;gap:8px;display:inline-flex}._5NXgpa_refresh{width:22px;height:22px;color:inherit;cursor:pointer;opacity:.65;background:0 0;border:1px solid #0000;border-radius:6px;justify-content:center;align-items:center;padding:0;transition:background-color .12s,opacity .12s;display:inline-flex}._5NXgpa_refresh:hover:not(:disabled){opacity:1;background:#7f7f7f29}._5NXgpa_refresh:disabled{cursor:default;opacity:.5}._5NXgpa_recharge{height:22px;color:var(--dsw-alias-state-success-primary);cursor:pointer;background:#2ea04329;border:1px solid #3fb95059;border-radius:6px;align-items:center;gap:4px;padding:0 8px;font-size:11px;font-weight:600;transition:background-color .12s,border-color .12s;display:inline-flex}._5NXgpa_recharge:hover{background:#2ea04347;border-color:#3fb95099}._5NXgpa_rechargePlus{font-size:13px;font-weight:700;line-height:1}._5NXgpa_rechargeHint{border-top:1px solid var(--dsw-alias-border-l2);opacity:.7;margin-top:10px;padding-top:8px;font-size:11px;line-height:1.5}._5NXgpa_spin{animation:.8s linear infinite _5NXgpa_balanceRefreshSpin}@keyframes _5NXgpa_balanceRefreshSpin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}._5NXgpa_section+._5NXgpa_section{border-top:1px solid var(--dsw-alias-border-l2);margin-top:10px;padding-top:8px}._5NXgpa_sectionTitle{letter-spacing:.04em;opacity:.6;margin:0 0 2px;font-size:11px;font-weight:600}._5NXgpa_rows{margin:0}._5NXgpa_row{justify-content:space-between;align-items:baseline;padding:4px 0;font-size:12px;display:flex}._5NXgpa_row dt{opacity:.7;margin:0}._5NXgpa_row dd{font-variant-numeric:tabular-nums;margin:0;font-weight:600}._5NXgpa_total{font-size:14px}._5NXgpa_state,._5NXgpa_error{opacity:.8;padding:4px 0;font-size:12px}._5NXgpa_error{color:var(--dsw-alias-state-error-primary);opacity:1}._5NXgpa_errorHint{opacity:.7;margin-top:6px;font-size:11px;line-height:1.5}._5NXgpa_note{background:#d299221f;border:1px solid #d299224d;border-radius:8px;margin-top:10px;padding:8px 10px;font-size:11px;line-height:1.5}._5NXgpa_models{flex-direction:column;gap:8px;display:flex}._5NXgpa_modelRow{border:1px solid var(--dsw-alias-border-l2);background:#7f7f7f0d;border-radius:8px;padding:6px 8px}._5NXgpa_modelHead{justify-content:space-between;align-items:baseline;gap:8px;display:flex}._5NXgpa_modelName{overflow-wrap:anywhere;font-size:12px;font-weight:600}._5NXgpa_modelRequests{opacity:.6;flex:none;font-size:11px}._5NXgpa_modelStats{font-variant-numeric:tabular-nums;opacity:.8;justify-content:space-between;align-items:baseline;gap:8px;margin-top:2px;font-size:11px;display:flex}";
		const tagId$1 = "@ticoguo/dsh-balance-check/BalanceButton.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@ticoguo/dsh-balance-check";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var BalanceButton_module_css_default = {
			"modelRow": "_5NXgpa_modelRow",
			"balanceRefreshSpin": "_5NXgpa_balanceRefreshSpin",
			"popover": "_5NXgpa_popover",
			"currency": "_5NXgpa_currency",
			"available": "_5NXgpa_available",
			"trigger": "_5NXgpa_trigger",
			"recharge": "_5NXgpa_recharge",
			"rows": "_5NXgpa_rows",
			"models": "_5NXgpa_models",
			"triggerError": "_5NXgpa_triggerError",
			"section": "_5NXgpa_section",
			"labelError": "_5NXgpa_labelError",
			"error": "_5NXgpa_error",
			"label": "_5NXgpa_label",
			"modelName": "_5NXgpa_modelName",
			"head": "_5NXgpa_head",
			"row": "_5NXgpa_row",
			"note": "_5NXgpa_note",
			"headRight": "_5NXgpa_headRight",
			"total": "_5NXgpa_total",
			"unavailable": "_5NXgpa_unavailable",
			"rechargeHint": "_5NXgpa_rechargeHint",
			"spin": "_5NXgpa_spin",
			"modelHead": "_5NXgpa_modelHead",
			"modelRequests": "_5NXgpa_modelRequests",
			"modelStats": "_5NXgpa_modelStats",
			"rechargePlus": "_5NXgpa_rechargePlus",
			"root": "_5NXgpa_root",
			"refresh": "_5NXgpa_refresh",
			"sectionTitle": "_5NXgpa_sectionTitle",
			"state": "_5NXgpa_state",
			"errorHint": "_5NXgpa_errorHint"
		};
		//#endregion
		//#region src/client/BalanceButton.tsx
		/**
		* BalanceButton: a compact "余额" control in the composer's right row that
		* expands into a popover showing the account balance plus consumption and token
		* usage, with a recharge action. Clicking queries the host /balance route once;
		* the API key and platform token stay server-side. Click-outside / Escape dismisses.
		*/
		/** Currency symbol for a code; DeepSeek is CNY-first, USD is the only other used. */
		function symbolFor(code) {
			return code === "USD" ? "$" : "¥";
		}
		/** Format a cost figure with its currency symbol, or an em dash when absent. */
		function money(value, code) {
			if (value === void 0 || !Number.isFinite(value)) return "�?;
			return `${symbolFor(code)}${value.toFixed(2)}`;
		}
		/** Format a token count with thousands separators, or an em dash when absent. */
		function tokens(value) {
			if (value === void 0) return "�?;
			return Math.round(value).toLocaleString();
		}
		/** Render the balance button + popover. */
		function BalanceButton({ queryBalance, openRecharge }) {
			const [open, setOpen] = (0, react.useState)(false);
			const [loading, setLoading] = (0, react.useState)(false);
			const [result, setResult] = (0, react.useState)(null);
			const [popoverMaxHeight, setPopoverMaxHeight] = (0, react.useState)();
			const [popoverPlace, setPopoverPlace] = (0, react.useState)();
			const rootRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				if (!open) return;
				const onPointerDown = (event) => {
					if (rootRef.current !== null && !rootRef.current.contains(event.target)) setOpen(false);
				};
				const onKeyDown = (event) => {
					if (event.key === "Escape") setOpen(false);
				};
				document.addEventListener("mousedown", onPointerDown);
				document.addEventListener("keydown", onKeyDown);
				return () => {
					document.removeEventListener("mousedown", onPointerDown);
					document.removeEventListener("keydown", onKeyDown);
				};
			}, [open]);
			const seqRef = (0, react.useRef)(0);
			const autoOpenedRef = (0, react.useRef)(false);
			const load = (0, react.useCallback)(async () => {
				const seq = ++seqRef.current;
				setLoading(true);
				let outcome = null;
				try {
					outcome = await queryBalance();
					if (seq === seqRef.current) setResult(outcome);
				} catch (error) {
					outcome = {
						ok: false,
						error: error instanceof Error ? error.message : String(error)
					};
					if (seq === seqRef.current) setResult(outcome);
				} finally {
					if (seq === seqRef.current) setLoading(false);
				}
				return outcome;
			}, [queryBalance]);
			const measurePopover = (0, react.useCallback)(() => {
				const rect = rootRef.current?.getBoundingClientRect();
				if (rect === void 0) return;
				const gap = 8;
				const spaceAbove = rect.top - gap - 4;
				setPopoverPlace({
					bottom: window.innerHeight - rect.top + gap,
					right: window.innerWidth - rect.right
				});
				setPopoverMaxHeight(spaceAbove > 0 ? spaceAbove : void 0);
			}, []);
			(0, react.useEffect)(() => {
				if (!open) return;
				measurePopover();
				window.addEventListener("resize", measurePopover);
				window.addEventListener("scroll", measurePopover, true);
				return () => {
					window.removeEventListener("resize", measurePopover);
					window.removeEventListener("scroll", measurePopover, true);
				};
			}, [open, measurePopover]);
			(0, react.useEffect)(() => {
				load().then((outcome) => {
					if (outcome !== null && !outcome.ok && !autoOpenedRef.current) {
						autoOpenedRef.current = true;
						measurePopover();
						setOpen(true);
					}
				});
			}, [load, measurePopover]);
			const toggle = (0, react.useCallback)(() => {
				if (open) {
					setOpen(false);
					return;
				}
				measurePopover();
				setOpen(true);
				load();
			}, [
				open,
				load,
				measurePopover
			]);
			const refresh = (0, react.useCallback)(() => {
				load();
			}, [load]);
			const balance = result?.ok === true ? result.balance : void 0;
			const usage = result?.ok === true ? result.usage : void 0;
			const models = result?.ok === true ? result.models : void 0;
			const usageHint = result?.ok === true ? result.usage_note : void 0;
			const isAvailable = result?.ok === true ? result.is_available : false;
			const balanceCode = balance?.currency;
			const usageCode = usage?.currency;
			const totalBalance = balance === void 0 ? void 0 : Number(balance.total_balance);
			const balanceShown = totalBalance !== void 0 && Number.isFinite(totalBalance);
			const isError = result !== null && result.ok === false;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: BalanceButton_module_css_default.root,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: isError ? `${BalanceButton_module_css_default.trigger} ${BalanceButton_module_css_default.triggerError}` : BalanceButton_module_css_default.trigger,
					onClick: toggle,
					"aria-label": isError ? "余额查询异常，点击查看详�? : "查询余额",
					"aria-expanded": open,
					title: isError ? "余额查询异常，点击查看详�? : "查询余额",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: isError ? `${BalanceButton_module_css_default.label} ${BalanceButton_module_css_default.labelError}` : BalanceButton_module_css_default.label,
						children: balanceShown ? `${symbolFor(balanceCode)}${totalBalance.toFixed(2)}` : isError ? "¥!" : result === null ? "�? : "¥"
					})
				}), open && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: BalanceButton_module_css_default.popover,
					role: "dialog",
					"aria-label": "账户余额与用�?,
					style: {
						maxHeight: popoverMaxHeight,
						bottom: popoverPlace?.bottom,
						right: popoverPlace?.right
					},
					children: [
						result === null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: BalanceButton_module_css_default.state,
							children: "查询中�?
						}),
						result !== null && result.ok === false && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: BalanceButton_module_css_default.error,
							children: [result.error, result.error.startsWith("未配�?) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: BalanceButton_module_css_default.errorHint,
								children: "配置入口：设�?�?插件 �?插件配置 �?余额显示"
							})]
						}),
						result !== null && result.ok === true && (balance !== void 0 || usage !== void 0 || usageHint !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: BalanceButton_module_css_default.body,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: BalanceButton_module_css_default.head,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: isAvailable ? BalanceButton_module_css_default.available : BalanceButton_module_css_default.unavailable,
										children: isAvailable ? "可用" : "不可�?
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: BalanceButton_module_css_default.headRight,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: BalanceButton_module_css_default.currency,
												children: balanceCode ?? usageCode
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: BalanceButton_module_css_default.recharge,
												onClick: openRecharge,
												"aria-label": "充�?,
												title: "前往 DeepSeek 官网充值（新标签页打开�?,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: BalanceButton_module_css_default.rechargePlus,
													"aria-hidden": "true",
													children: "+"
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "充�? })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: BalanceButton_module_css_default.refresh,
												onClick: refresh,
												disabled: loading,
												"aria-label": "刷新",
												title: "刷新",
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
													viewBox: "0 0 24 24",
													width: "13",
													height: "13",
													"aria-hidden": true,
													className: loading ? BalanceButton_module_css_default.spin : void 0,
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
														d: "M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
														fill: "currentColor"
													})
												})
											})
										]
									})]
								}),
								balance !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
									className: BalanceButton_module_css_default.section,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", {
										className: BalanceButton_module_css_default.sectionTitle,
										children: "余额"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("dl", {
										className: BalanceButton_module_css_default.rows,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "总余�? }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", {
													className: BalanceButton_module_css_default.total,
													children: money(totalBalance, balanceCode)
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "充值余�? }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: money(Number(balance.topped_up_balance), balanceCode) })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "赠送余�? }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: money(Number(balance.granted_balance), balanceCode) })]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
									className: BalanceButton_module_css_default.section,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", {
										className: BalanceButton_module_css_default.sectionTitle,
										children: "消费金额"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("dl", {
										className: BalanceButton_module_css_default.rows,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "今日" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: money(usage?.today_cost, usageCode) })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "本周" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: money(usage?.week_cost, usageCode) })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "本月" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: money(usage?.month_cost, usageCode) })]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
									className: BalanceButton_module_css_default.section,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", {
										className: BalanceButton_module_css_default.sectionTitle,
										children: "Tokens 用量"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("dl", {
										className: BalanceButton_module_css_default.rows,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "今日" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: tokens(usage?.today_tokens) })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "本周" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: tokens(usage?.week_tokens) })]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: "本月" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: tokens(usage?.month_tokens) })]
											})
										]
									})]
								}),
								models !== void 0 && models.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
									className: BalanceButton_module_css_default.section,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", {
										className: BalanceButton_module_css_default.sectionTitle,
										children: "模型明细（本月）"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: BalanceButton_module_css_default.models,
										children: models.map((model) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: BalanceButton_module_css_default.modelRow,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.modelHead,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: BalanceButton_module_css_default.modelName,
													children: model.model
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
													className: BalanceButton_module_css_default.modelRequests,
													children: [model.requests, " �?]
												})]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.modelStats,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [tokens(model.tokens), " tokens"] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: money(model.cost, usageCode) })]
											})]
										}, model.model))
									})]
								}),
								usageHint !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: BalanceButton_module_css_default.note,
									children: usageHint
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: BalanceButton_module_css_default.rechargeHint,
									children: "余额不足？点上方「充值」前往 DeepSeek 官网充值�?
								})
							]
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: BalanceButton_module_css_default.state,
							children: "接口未返回余额信�?
						}))
					]
				})]
			});
		}
		//#endregion
		//#region \0dsh-css:src\client\BalanceCard.module.css.mjs
		const css = ".E4ORwG_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.E4ORwG_card:hover{border-color:var(--dsw-alias-label-dimmed)}.E4ORwG_cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.E4ORwG_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.E4ORwG_header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.E4ORwG_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.E4ORwG_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.E4ORwG_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.E4ORwG_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.E4ORwG_chevronOpen{transform:rotate(180deg)}.E4ORwG_body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.E4ORwG_field{flex-direction:column;gap:6px;padding:12px 0;display:flex}.E4ORwG_field+.E4ORwG_field{border-top:1px solid var(--dsw-alias-border-l2)}.E4ORwG_head{align-items:center;gap:8px;display:flex}.E4ORwG_label{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:500;line-height:1.5}.E4ORwG_badges{align-items:center;gap:8px;display:inline-flex}.E4ORwG_badge{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.E4ORwG_badgeMuted{white-space:nowrap;color:var(--dsw-alias-label-tertiary);border-radius:999px;padding:1px 8px;font-size:11px;line-height:17px}.E4ORwG_masked{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-3);border:1px dashed var(--dsw-alias-border-l2);border-radius:8px;padding:4px 12px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;line-height:1.5}.E4ORwG_input{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.E4ORwG_input:focus-visible{border-color:var(--dsw-alias-brand-primary);outline:none}.E4ORwG_input:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}.E4ORwG_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.E4ORwG_howto{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:8px;flex-direction:column;gap:6px;margin-top:4px;padding:10px 12px;display:flex}.E4ORwG_howtoTitle{color:var(--dsw-alias-label-primary);margin:0;font-size:13px;font-weight:600}.E4ORwG_howtoStep{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.E4ORwG_code{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;border-radius:6px;padding:6px 8px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px}.E4ORwG_footer{border-top:1px solid var(--dsw-alias-border-l2);justify-content:flex-end;align-items:center;gap:8px;padding:12px 0 4px;display:flex}.E4ORwG_failed{min-width:0;color:var(--dsw-alias-label-error);flex:1;margin:0;font-size:12px;line-height:1.5}.E4ORwG_discard,.E4ORwG_save{appearance:none;font:inherit;cursor:pointer;border:1px solid #0000;border-radius:8px;padding:5px 14px;font-size:13px;line-height:1.5}.E4ORwG_discard{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);background:0 0}.E4ORwG_discard:hover:not(:disabled){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-dimmed)}.E4ORwG_save{background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-3)}.E4ORwG_discard:disabled,.E4ORwG_save:disabled{opacity:.4;cursor:default}.E4ORwG_discard:focus-visible,.E4ORwG_save:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}";
		const tagId = "@ticoguo/dsh-balance-check/BalanceCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@ticoguo/dsh-balance-check";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var BalanceCard_module_css_default = {
			"badges": "E4ORwG_badges",
			"field": "E4ORwG_field",
			"chevronOpen": "E4ORwG_chevronOpen",
			"howto": "E4ORwG_howto",
			"howtoTitle": "E4ORwG_howtoTitle",
			"discard": "E4ORwG_discard",
			"chevron": "E4ORwG_chevron",
			"label": "E4ORwG_label",
			"header": "E4ORwG_header",
			"badgeMuted": "E4ORwG_badgeMuted",
			"input": "E4ORwG_input",
			"card": "E4ORwG_card",
			"hint": "E4ORwG_hint",
			"footer": "E4ORwG_footer",
			"failed": "E4ORwG_failed",
			"save": "E4ORwG_save",
			"masked": "E4ORwG_masked",
			"description": "E4ORwG_description",
			"head": "E4ORwG_head",
			"code": "E4ORwG_code",
			"cardOpen": "E4ORwG_cardOpen",
			"headText": "E4ORwG_headText",
			"name": "E4ORwG_name",
			"body": "E4ORwG_body",
			"howtoStep": "E4ORwG_howtoStep",
			"badge": "E4ORwG_badge"
		};
		//#endregion
		//#region src/client/BalanceCard.tsx
		/**
		* The balance-check plugin-configuration card. It mirrors the shared plugin
		* card chrome (Settings �?Plugins �?Plugin configuration) visually, but is
		* self-contained: a third-party client plugin cannot value-import the
		* settings-plugins card components (the client bundle purity gate), so this
		* card owns its disclosure, controls, and styles.
		*
		* The two controls are credentials only: each shows the MASKED configured value
		* read from the host /balance route, with a password input that stages a
		* replacement. The endpoint and recharge-page overrides are not user fields and
		* are intentionally not rendered.
		*/
		/** The console snippet that prints the platform login token. */
		const USER_TOKEN_SNIPPET = "JSON.parse(localStorage.getItem('userToken')).value";
		/** One write-only credential control: masked value + replacement input. */
		function SecretField(props) {
			const disabled = !props.state.writable;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: BalanceCard_module_css_default.field,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: BalanceCard_module_css_default.head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: BalanceCard_module_css_default.label,
							htmlFor: props.id,
							children: props.label
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: BalanceCard_module_css_default.badges,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: props.state.configured ? BalanceCard_module_css_default.badge : BalanceCard_module_css_default.badgeMuted,
								children: props.state.configured ? props.configuredLabel : props.unconfiguredLabel
							})
						})]
					}),
					props.state.configured && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: BalanceCard_module_css_default.masked,
						"aria-label": props.configuredLabel,
						children: props.state.masked
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						id: props.id,
						className: BalanceCard_module_css_default.input,
						type: "password",
						autoComplete: "off",
						value: props.state.text,
						placeholder: props.replaceHint,
						disabled,
						onChange: (event) => {
							props.onEdit(event.target.value);
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: BalanceCard_module_css_default.hint,
						children: props.hint
					})
				]
			});
		}
		/** Render the balance-check card. */
		function BalanceCard(props) {
			const { t } = props;
			const state = props.useCard((snapshot) => snapshot);
			const [open, setOpen] = (0, react.useState)(false);
			if (!state.available) return null;
			const title = t("cardTitle");
			const canSave = state.dirty && !state.saving;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: open ? `${BalanceCard_module_css_default.card} ${BalanceCard_module_css_default.cardOpen}` : BalanceCard_module_css_default.card,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: BalanceCard_module_css_default.header,
					"aria-expanded": open,
					onClick: () => {
						setOpen(!open);
					},
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: BalanceCard_module_css_default.headText,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: BalanceCard_module_css_default.name,
								children: title
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: BalanceCard_module_css_default.description,
								children: t("cardDescription")
							})]
						}),
						state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: BalanceCard_module_css_default.pending,
							children: t("unsaved")
						}) : null,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: open ? BalanceCard_module_css_default.chevronOpen : BalanceCard_module_css_default.chevron })
					]
				}), open && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: BalanceCard_module_css_default.body,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SecretField, {
							id: "balance-check-api-key",
							label: t("apiKey"),
							hint: t("apiKeyHint"),
							configuredLabel: t("configured"),
							unconfiguredLabel: t("unconfigured"),
							replaceHint: t("replaceKey"),
							state: state.apiKey,
							onEdit: (text) => {
								props.edit("apiKey", text);
							}
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SecretField, {
							id: "balance-check-user-token",
							label: t("userToken"),
							hint: t("userTokenHint"),
							configuredLabel: t("configured"),
							unconfiguredLabel: t("unconfigured"),
							replaceHint: t("replaceToken"),
							state: state.userToken,
							onEdit: (text) => {
								props.edit("userToken", text);
							}
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
							className: BalanceCard_module_css_default.howto,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h4", {
									className: BalanceCard_module_css_default.howtoTitle,
									children: t("howToTitle")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: BalanceCard_module_css_default.howtoStep,
									children: t("howToStep1")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
									className: BalanceCard_module_css_default.code,
									children: USER_TOKEN_SNIPPET
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: BalanceCard_module_css_default.howtoStep,
									children: t("howToStep2")
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: BalanceCard_module_css_default.footer,
							children: [
								state.failed ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: BalanceCard_module_css_default.failed,
									role: "status",
									children: t("failed")
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: BalanceCard_module_css_default.discard,
									disabled: !state.dirty || state.saving,
									onClick: props.discard,
									children: t("discard")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: BalanceCard_module_css_default.save,
									disabled: !canSave,
									onClick: props.save,
									children: t(state.saving ? "saving" : "save")
								})
							]
						})
					]
				})]
			});
		}
		//#endregion
		//#region src/client/balance-card-controller.ts
		/** Settings namespace the host plugin registers for this card. */
		const BALANCE_NS = "balance-check";
		/** Credential reference carrying the DeepSeek API key. */
		const API_KEY_REF = "DEEPSEEK_API_KEY";
		/** Credential reference carrying the DeepSeek platform session token. */
		const USER_TOKEN_REF = "DEEPSEEK_USER_TOKEN";
		/** Default DeepSeek platform recharge page (opens in a new tab). */
		const DEFAULT_RECHARGE_URL = "https://platform.deepseek.com/top_up";
		/** Bridges the credentials domain and the host /balance route onto the card. */
		var BalanceCardController = class {
			scope;
			api;
			queryConfigured;
			staged = /* @__PURE__ */ new Map();
			store;
			apiKeyMasked = "";
			userTokenMasked = "";
			apiKeyWritable = true;
			userTokenWritable = true;
			saving = false;
			failed = false;
			/**
			* @param scope - the bound settings scope for the `balance-check` namespace.
			* @param api - wire face used for the credentials this card writes.
			* @param queryConfigured - fetches the host /balance?usage=0 route (masked credentials only).
			*/
			constructor(scope, api, queryConfigured) {
				this.scope = scope;
				this.api = api;
				this.queryConfigured = queryConfigured;
				this.store = (0, _deepseek_ai_dsh_client_runtime_client.createSnapshotStore)(this.projection());
				scope.subscribe(() => {
					this.publish();
				});
				this.readConfigured();
			}
			/** Read the masked configured values and each credential's writability. */
			async readConfigured() {
				try {
					const balance = await this.queryConfigured();
					if (balance.ok) {
						this.apiKeyMasked = balance.configured.apiKey;
						this.userTokenMasked = balance.configured.userToken;
					}
				} catch (_balanceReadFailure) {}
				try {
					const described = await this.api.credentials.describe({ refs: [API_KEY_REF, USER_TOKEN_REF] });
					if (described.result.ok) {
						const views = described.result.value.credentials;
						this.apiKeyWritable = views["DEEPSEEK_API_KEY"]?.writable ?? true;
						this.userTokenWritable = views["DEEPSEEK_USER_TOKEN"]?.writable ?? true;
					}
				} catch (_credentialReadFailure) {}
				this.publish();
			}
			/** Build the face the card's slot registration injects. */
			inject() {
				return {
					hooks: { card: this.store },
					edit: (field, text) => {
						this.staged.set(field, text);
						this.failed = false;
						this.publish();
					},
					save: () => {
						this.save();
					},
					discard: () => {
						if (this.staged.size === 0 && !this.failed) return;
						this.staged.clear();
						this.failed = false;
						this.publish();
					}
				};
			}
			/** The current recharge page URL: the configured override, else the default. */
			rechargeURL() {
				const override = this.scope.getSnapshot().value?.rechargeURL;
				return typeof override === "string" && override.length > 0 ? override : DEFAULT_RECHARGE_URL;
			}
			/** Open the DeepSeek recharge page in a new tab. */
			openRecharge() {
				window.open(this.rechargeURL(), "_blank", "noopener,noreferrer");
			}
			projection() {
				return {
					available: true,
					dirty: this.staged.size > 0,
					saving: this.saving,
					failed: this.failed,
					apiKey: this.secretState("apiKey", this.apiKeyMasked, this.apiKeyWritable),
					userToken: this.secretState("userToken", this.userTokenMasked, this.userTokenWritable)
				};
			}
			secretState(field, masked, writable) {
				return {
					masked,
					configured: masked.length > 0,
					writable,
					text: this.staged.get(field) ?? ""
				};
			}
			/** Write every staged edit, then re-read from what the Host accepted. */
			async save() {
				if (this.staged.size === 0 || this.saving) return;
				this.saving = true;
				this.failed = false;
				this.publish();
				let landed = true;
				for (const [field, text] of this.staged) {
					const value = text.trim();
					if (value === "") continue;
					const ref = field === "apiKey" ? API_KEY_REF : USER_TOKEN_REF;
					try {
						await this.api.credentials.set({
							ref,
							value
						});
					} catch (_credentialWriteFailure) {
						landed = false;
					}
				}
				if (landed) this.staged.clear();
				this.saving = false;
				this.failed = !landed;
				await this.readConfigured();
				this.publish();
			}
			publish() {
				this.store.set(this.projection());
			}
		};
		//#endregion
		//#region src/client/locales.ts
		/** English copy. */
		const en = {
			cardTitle: "Balance display",
			cardDescription: "Shows the DeepSeek account balance beside the composer, plus cost and token usage.",
			apiKey: "DeepSeek API Key",
			apiKeyHint: "Starts with \"sk-\". Create one at https://platform.deepseek.com/api_keys. Type a new value to replace the current key.",
			userToken: "Platform user token",
			userTokenHint: "The login token from platform.deepseek.com, used only for cost and token usage. Type a new value to replace the current token.",
			configured: "Configured",
			unconfigured: "Not configured",
			replaceKey: "Type a new key to replace",
			replaceToken: "Type a new token to replace",
			howToTitle: "How to get the user token",
			howToStep1: "Sign in at https://platform.deepseek.com, then open the browser console (F12) and run:",
			howToStep2: "Copy the printed value (the text between the quotes) into the field above.",
			save: "Save",
			saving: "Saving�?,
			discard: "Discard",
			unsaved: "Unsaved",
			failed: "The deployment did not accept these values; they were left for you to correct."
		};
		/** Simplified Chinese copy. */
		const zh = {
			cardTitle: "余额显示",
			cardDescription: "在输入框旁显�?DeepSeek 账户余额，并展示消费金额�?Tokens 用量�?,
			apiKey: "DeepSeek API Key",
			apiKeyHint: "�?\"sk-\" 开头，�?https://platform.deepseek.com/api_keys 创建。输入新值即可替换当前密钥�?,
			userToken: "平台登录�?Token",
			userTokenHint: "platform.deepseek.com 的登录态令牌，仅用于消费金额与 Tokens 用量。输入新值即可替换当�?token�?,
			configured: "已配�?,
			unconfigured: "未配�?,
			replaceKey: "输入新密钥以替换",
			replaceToken: "输入�?token 以替�?,
			howToTitle: "如何获取平台登录�?token",
			howToStep1: "登录 https://platform.deepseek.com 后，打开浏览器控制台（F12），执行�?,
			howToStep2: "把打印出来的值（引号中间的纯文本）复制到上方输入框�?,
			save: "保存",
			saving: "保存中�?,
			discard: "放弃修改",
			unsaved: "未保�?,
			failed: "本部署没有接受这些值，已保留供你修改�?
		};
		//#endregion
		//#region src/client/index.ts
		/** Dictionary namespace owned by this plugin's card. */
		const NS = "balance-check";
		/** Required services (cordis fiber inject). */
		const inject = [
			"slots",
			"locale",
			"connection",
			"settingsScope"
		];
		/** Query the host balance route (the API key never reaches the browser). */
		async function queryBalance() {
			const response = await fetch("/balance", {
				method: "GET",
				headers: { Accept: "application/json" }
			});
			if (!response.ok) return {
				ok: false,
				error: `查询失败（HTTP ${response.status}）`
			};
			return await response.json();
		}
		/**
		* Query ONLY the masked configured credentials via the host's lightweight mode
		* (`?usage=0`): no balance fetch, no platform usage aggregation �?opening the
		* settings card must not trigger up to four platform requests.
		*/
		async function queryConfigured() {
			const response = await fetch("/balance?usage=0", {
				method: "GET",
				headers: { Accept: "application/json" }
			});
			if (!response.ok) return {
				ok: false,
				error: `查询失败（HTTP ${response.status}）`
			};
			return await response.json();
		}
		/**
		* Client plugin body: mount the balance button and the plugin-configuration card.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			const { api } = ctx.get("connection");
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-balance-check: card dictionaries");
			const card = new BalanceCardController(ctx.settingsScope.bind({ namespace: BALANCE_NS }), api, queryConfigured);
			ctx.slots.inject("conversation.input.right", () => ctx.slots.register({
				name: "conversation.input.right",
				id: "balance-check",
				order: 0,
				inject: () => ({
					queryBalance,
					openRecharge: () => card.openRecharge()
				})
			}, BalanceButton));
			ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
				name: "settings.plugin.item",
				key: "balance-check",
				locale: NS,
				inject: () => card.inject()
			}, BalanceCard));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map