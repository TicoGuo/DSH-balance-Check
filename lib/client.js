window.__ModuleLoader__.load({
	id: "@ticoguo/dsh-balance-check",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region \0dsh-css:E:\DeepSeek_Harness_Code\deepseek-harness\packages\client\ui-balance-check\src\client\BalanceButton.module.css.mjs
		const css$1 = ".nft0-a_root{display:inline-flex;position:relative}.nft0-a_trigger{height:28px;color:inherit;cursor:pointer;background:0 0;border:1px solid #0000;border-radius:14px;align-items:center;gap:6px;padding:0 9px;font-size:12px;line-height:1;transition:background-color .12s,border-color .12s;display:inline-flex}.nft0-a_trigger:hover{background:#7f7f7f24}.nft0-a_label{font-variant-numeric:tabular-nums;font-weight:600}.nft0-a_popover{background:var(--dsh-surface,#1e1e1e);z-index:40;border:1px solid #7f7f7f40;border-radius:10px;width:264px;padding:12px;position:absolute;bottom:calc(100% + 8px);right:0;box-shadow:0 8px 24px #00000059}.nft0-a_head{justify-content:space-between;align-items:center;margin-bottom:10px;display:flex}.nft0-a_available,.nft0-a_unavailable{border-radius:10px;padding:2px 8px;font-size:11px;font-weight:600}.nft0-a_available{color:#3fb950;background:#2ea0432e}.nft0-a_unavailable{color:#f85149;background:#f851492e}.nft0-a_currency{opacity:.6;font-size:11px}.nft0-a_headRight{align-items:center;gap:8px;display:inline-flex}.nft0-a_refresh{width:22px;height:22px;color:inherit;cursor:pointer;opacity:.65;background:0 0;border:1px solid #0000;border-radius:6px;justify-content:center;align-items:center;padding:0;transition:background-color .12s,opacity .12s;display:inline-flex}.nft0-a_refresh:hover:not(:disabled){opacity:1;background:#7f7f7f29}.nft0-a_refresh:disabled{cursor:default;opacity:.5}.nft0-a_recharge{color:#3fb950;cursor:pointer;background:#2ea04329;border:1px solid #3fb95059;border-radius:6px;align-items:center;gap:4px;height:22px;padding:0 8px;font-size:11px;font-weight:600;transition:background-color .12s,border-color .12s;display:inline-flex}.nft0-a_recharge:hover{background:#2ea04347;border-color:#3fb95099}.nft0-a_rechargePlus{font-size:13px;font-weight:700;line-height:1}.nft0-a_rechargeHint{opacity:.7;border-top:1px solid #7f7f7f29;margin-top:10px;padding-top:8px;font-size:11px;line-height:1.5}.nft0-a_spin{animation:.8s linear infinite nft0-a_balanceRefreshSpin}@keyframes nft0-a_balanceRefreshSpin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.nft0-a_section+.nft0-a_section{border-top:1px solid #7f7f7f29;margin-top:10px;padding-top:8px}.nft0-a_sectionTitle{letter-spacing:.04em;opacity:.6;margin:0 0 2px;font-size:11px;font-weight:600}.nft0-a_rows{margin:0}.nft0-a_row{justify-content:space-between;align-items:baseline;padding:4px 0;font-size:12px;display:flex}.nft0-a_row dt{opacity:.7;margin:0}.nft0-a_row dd{font-variant-numeric:tabular-nums;margin:0;font-weight:600}.nft0-a_total{font-size:14px}.nft0-a_state,.nft0-a_error{opacity:.8;padding:4px 0;font-size:12px}.nft0-a_error{color:#f85149;opacity:1}.nft0-a_note{background:#d299221f;border:1px solid #d299224d;border-radius:8px;margin-top:10px;padding:8px 10px;font-size:11px;line-height:1.5}.nft0-a_models{flex-direction:column;gap:8px;max-height:180px;display:flex;overflow-y:auto}.nft0-a_modelRow{background:#7f7f7f0d;border:1px solid #7f7f7f24;border-radius:8px;padding:6px 8px}.nft0-a_modelHead{justify-content:space-between;align-items:baseline;gap:8px;display:flex}.nft0-a_modelName{overflow-wrap:anywhere;font-size:12px;font-weight:600}.nft0-a_modelRequests{opacity:.6;flex:none;font-size:11px}.nft0-a_modelStats{font-variant-numeric:tabular-nums;opacity:.8;justify-content:space-between;align-items:baseline;gap:8px;margin-top:2px;font-size:11px;display:flex}";
		const tagId$1 = "@ticoguo/dsh-balance-check/BalanceButton.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@ticoguo/dsh-balance-check";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var BalanceButton_module_css_default = {
			"total": "nft0-a_total",
			"root": "nft0-a_root",
			"recharge": "nft0-a_recharge",
			"modelRow": "nft0-a_modelRow",
			"trigger": "nft0-a_trigger",
			"modelHead": "nft0-a_modelHead",
			"spin": "nft0-a_spin",
			"modelStats": "nft0-a_modelStats",
			"available": "nft0-a_available",
			"sectionTitle": "nft0-a_sectionTitle",
			"row": "nft0-a_row",
			"rechargePlus": "nft0-a_rechargePlus",
			"models": "nft0-a_models",
			"refresh": "nft0-a_refresh",
			"balanceRefreshSpin": "nft0-a_balanceRefreshSpin",
			"note": "nft0-a_note",
			"headRight": "nft0-a_headRight",
			"modelRequests": "nft0-a_modelRequests",
			"rows": "nft0-a_rows",
			"currency": "nft0-a_currency",
			"error": "nft0-a_error",
			"popover": "nft0-a_popover",
			"modelName": "nft0-a_modelName",
			"rechargeHint": "nft0-a_rechargeHint",
			"state": "nft0-a_state",
			"head": "nft0-a_head",
			"section": "nft0-a_section",
			"label": "nft0-a_label",
			"unavailable": "nft0-a_unavailable"
		};
		//#endregion
		//#region lib/types/client/BalanceButton.js
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
			if (value === void 0 || !Number.isFinite(value)) return "—";
			return `${symbolFor(code)}${value.toFixed(2)}`;
		}
		/** Format a token count with thousands separators, or an em dash when absent. */
		function tokens(value) {
			if (value === void 0) return "—";
			return Math.round(value).toLocaleString();
		}
		/** Render the balance button + popover. */
		function BalanceButton({ queryBalance, openRecharge }) {
			const [open, setOpen] = (0, react.useState)(false);
			const [loading, setLoading] = (0, react.useState)(false);
			const [result, setResult] = (0, react.useState)(null);
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
			const load = (0, react.useCallback)(async () => {
				setLoading(true);
				try {
					setResult(await queryBalance());
				} catch (error) {
					setResult({
						ok: false,
						error: error instanceof Error ? error.message : String(error)
					});
				} finally {
					setLoading(false);
				}
			}, [queryBalance]);
			(0, react.useEffect)(() => {
				load();
			}, [load]);
			const toggle = (0, react.useCallback)(() => {
				if (open) {
					setOpen(false);
					return;
				}
				setOpen(true);
				load();
			}, [open, load]);
			const refresh = (0, react.useCallback)(() => {
				load();
			}, [load]);
			const balance = result?.ok === true ? result.balance : void 0;
			const usage = result?.ok === true ? result.usage : void 0;
			const models = result?.ok === true ? result.models : void 0;
			const usageHint = (result?.ok === true ? result.usage_note : void 0) ?? (usage === void 0 ? "未获取到用量数据：请重启 dsh 服务，并在 .credentials.yaml 配置 DEEPSEEK_USER_TOKEN 后即可显示消费金额与 Tokens 用量。" : void 0);
			const isAvailable = result?.ok === true ? result.is_available : false;
			const balanceCode = balance?.currency;
			const usageCode = usage?.currency;
			const totalBalance = balance === void 0 ? void 0 : Number(balance.total_balance);
			return (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: BalanceButton_module_css_default.root,
				children: [(0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: BalanceButton_module_css_default.trigger,
					onClick: toggle,
					"aria-label": "查询余额",
					"aria-expanded": open,
					title: "查询余额",
					children: (0, react_jsx_runtime.jsx)("span", {
						className: BalanceButton_module_css_default.label,
						children: totalBalance !== void 0 && Number.isFinite(totalBalance) ? `${symbolFor(balanceCode)}${totalBalance.toFixed(2)}` : "…"
					})
				}), open && (0, react_jsx_runtime.jsxs)("div", {
					className: BalanceButton_module_css_default.popover,
					role: "dialog",
					"aria-label": "账户余额与用量",
					children: [
						result === null && (0, react_jsx_runtime.jsx)("div", {
							className: BalanceButton_module_css_default.state,
							children: "查询中…"
						}),
						result !== null && result.ok === false && (0, react_jsx_runtime.jsx)("div", {
							className: BalanceButton_module_css_default.error,
							children: result.error
						}),
						result !== null && result.ok === true && (balance !== void 0 || usage !== void 0 || usageHint !== void 0 ? (0, react_jsx_runtime.jsxs)("div", {
							className: BalanceButton_module_css_default.body,
							children: [
								(0, react_jsx_runtime.jsxs)("div", {
									className: BalanceButton_module_css_default.head,
									children: [(0, react_jsx_runtime.jsx)("span", {
										className: isAvailable ? BalanceButton_module_css_default.available : BalanceButton_module_css_default.unavailable,
										children: isAvailable ? "可用" : "不可用"
									}), (0, react_jsx_runtime.jsxs)("div", {
										className: BalanceButton_module_css_default.headRight,
										children: [
											(0, react_jsx_runtime.jsx)("span", {
												className: BalanceButton_module_css_default.currency,
												children: balanceCode ?? usageCode
											}),
											(0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: BalanceButton_module_css_default.recharge,
												onClick: openRecharge,
												"aria-label": "充值",
												title: "前往 DeepSeek 官网充值（新标签页打开）",
												children: [(0, react_jsx_runtime.jsx)("span", {
													className: BalanceButton_module_css_default.rechargePlus,
													"aria-hidden": "true",
													children: "+"
												}), (0, react_jsx_runtime.jsx)("span", { children: "充值" })]
											}),
											(0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: BalanceButton_module_css_default.refresh,
												onClick: refresh,
												disabled: loading,
												"aria-label": "刷新",
												title: "刷新",
												children: (0, react_jsx_runtime.jsx)("svg", {
													viewBox: "0 0 24 24",
													width: "13",
													height: "13",
													"aria-hidden": true,
													className: loading ? BalanceButton_module_css_default.spin : void 0,
													children: (0, react_jsx_runtime.jsx)("path", {
														d: "M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
														fill: "currentColor"
													})
												})
											})
										]
									})]
								}),
								balance !== void 0 && (0, react_jsx_runtime.jsxs)("section", {
									className: BalanceButton_module_css_default.section,
									children: [(0, react_jsx_runtime.jsx)("h4", {
										className: BalanceButton_module_css_default.sectionTitle,
										children: "余额"
									}), (0, react_jsx_runtime.jsxs)("dl", {
										className: BalanceButton_module_css_default.rows,
										children: [
											(0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [(0, react_jsx_runtime.jsx)("dt", { children: "总余额" }), (0, react_jsx_runtime.jsx)("dd", {
													className: BalanceButton_module_css_default.total,
													children: money(totalBalance, balanceCode)
												})]
											}),
											(0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [(0, react_jsx_runtime.jsx)("dt", { children: "充值余额" }), (0, react_jsx_runtime.jsx)("dd", { children: money(Number(balance.topped_up_balance), balanceCode) })]
											}),
											(0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [(0, react_jsx_runtime.jsx)("dt", { children: "赠送余额" }), (0, react_jsx_runtime.jsx)("dd", { children: money(Number(balance.granted_balance), balanceCode) })]
											})
										]
									})]
								}),
								(0, react_jsx_runtime.jsxs)("section", {
									className: BalanceButton_module_css_default.section,
									children: [(0, react_jsx_runtime.jsx)("h4", {
										className: BalanceButton_module_css_default.sectionTitle,
										children: "消费金额"
									}), (0, react_jsx_runtime.jsxs)("dl", {
										className: BalanceButton_module_css_default.rows,
										children: [
											(0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [(0, react_jsx_runtime.jsx)("dt", { children: "今日" }), (0, react_jsx_runtime.jsx)("dd", { children: money(usage?.today_cost, usageCode) })]
											}),
											(0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [(0, react_jsx_runtime.jsx)("dt", { children: "本周" }), (0, react_jsx_runtime.jsx)("dd", { children: money(usage?.week_cost, usageCode) })]
											}),
											(0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [(0, react_jsx_runtime.jsx)("dt", { children: "本月" }), (0, react_jsx_runtime.jsx)("dd", { children: money(usage?.month_cost, usageCode) })]
											})
										]
									})]
								}),
								(0, react_jsx_runtime.jsxs)("section", {
									className: BalanceButton_module_css_default.section,
									children: [(0, react_jsx_runtime.jsx)("h4", {
										className: BalanceButton_module_css_default.sectionTitle,
										children: "Tokens 用量"
									}), (0, react_jsx_runtime.jsxs)("dl", {
										className: BalanceButton_module_css_default.rows,
										children: [
											(0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [(0, react_jsx_runtime.jsx)("dt", { children: "今日" }), (0, react_jsx_runtime.jsx)("dd", { children: tokens(usage?.today_tokens) })]
											}),
											(0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [(0, react_jsx_runtime.jsx)("dt", { children: "本周" }), (0, react_jsx_runtime.jsx)("dd", { children: tokens(usage?.week_tokens) })]
											}),
											(0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.row,
												children: [(0, react_jsx_runtime.jsx)("dt", { children: "本月" }), (0, react_jsx_runtime.jsx)("dd", { children: tokens(usage?.month_tokens) })]
											})
										]
									})]
								}),
								models !== void 0 && models.length > 0 && (0, react_jsx_runtime.jsxs)("section", {
									className: BalanceButton_module_css_default.section,
									children: [(0, react_jsx_runtime.jsx)("h4", {
										className: BalanceButton_module_css_default.sectionTitle,
										children: "模型明细（本月）"
									}), (0, react_jsx_runtime.jsx)("div", {
										className: BalanceButton_module_css_default.models,
										children: models.map((model) => (0, react_jsx_runtime.jsxs)("div", {
											className: BalanceButton_module_css_default.modelRow,
											children: [(0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.modelHead,
												children: [(0, react_jsx_runtime.jsx)("span", {
													className: BalanceButton_module_css_default.modelName,
													children: model.model
												}), (0, react_jsx_runtime.jsxs)("span", {
													className: BalanceButton_module_css_default.modelRequests,
													children: [model.requests, " 次"]
												})]
											}), (0, react_jsx_runtime.jsxs)("div", {
												className: BalanceButton_module_css_default.modelStats,
												children: [(0, react_jsx_runtime.jsxs)("span", { children: [tokens(model.tokens), " tokens"] }), (0, react_jsx_runtime.jsx)("span", { children: money(model.cost, usageCode) })]
											})]
										}, model.model))
									})]
								}),
								usageHint !== void 0 && (0, react_jsx_runtime.jsx)("div", {
									className: BalanceButton_module_css_default.note,
									children: usageHint
								}),
								(0, react_jsx_runtime.jsx)("div", {
									className: BalanceButton_module_css_default.rechargeHint,
									children: "余额不足？点上方「充值」前往 DeepSeek 官网充值。"
								})
							]
						}) : (0, react_jsx_runtime.jsx)("div", {
							className: BalanceButton_module_css_default.state,
							children: "接口未返回余额信息"
						}))
					]
				})]
			});
		}
		//#endregion
		//#region \0dsh-css:E:\DeepSeek_Harness_Code\deepseek-harness\packages\client\ui-balance-check\src\client\BalanceCard.module.css.mjs
		const css = ".pI3cIq_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.pI3cIq_card:hover{border-color:var(--dsw-alias-label-dimmed)}.pI3cIq_cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.pI3cIq_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.pI3cIq_header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.pI3cIq_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.pI3cIq_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.pI3cIq_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.pI3cIq_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.pI3cIq_chevronOpen{transform:rotate(180deg)}.pI3cIq_body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.pI3cIq_field{flex-direction:column;gap:6px;padding:12px 0;display:flex}.pI3cIq_field+.pI3cIq_field{border-top:1px solid var(--dsw-alias-border-l2)}.pI3cIq_head{align-items:center;gap:8px;display:flex}.pI3cIq_label{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:500;line-height:1.5}.pI3cIq_badges{align-items:center;gap:8px;display:inline-flex}.pI3cIq_badge{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.pI3cIq_badgeMuted{white-space:nowrap;color:var(--dsw-alias-label-tertiary);border-radius:999px;padding:1px 8px;font-size:11px;line-height:17px}.pI3cIq_masked{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-3);border:1px dashed var(--dsw-alias-border-l2);border-radius:8px;padding:4px 12px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;line-height:1.5}.pI3cIq_input{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.pI3cIq_input:focus-visible{border-color:var(--dsw-alias-brand-primary);outline:none}.pI3cIq_input:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}.pI3cIq_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.pI3cIq_howto{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:8px;flex-direction:column;gap:6px;margin-top:4px;padding:10px 12px;display:flex}.pI3cIq_howtoTitle{color:var(--dsw-alias-label-primary);margin:0;font-size:13px;font-weight:600}.pI3cIq_howtoStep{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.pI3cIq_code{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);overflow-wrap:anywhere;border-radius:6px;padding:6px 8px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px}.pI3cIq_footer{border-top:1px solid var(--dsw-alias-border-l2);justify-content:flex-end;align-items:center;gap:8px;padding:12px 0 4px;display:flex}.pI3cIq_failed{min-width:0;color:var(--dsw-alias-label-error);flex:1;margin:0;font-size:12px;line-height:1.5}.pI3cIq_discard,.pI3cIq_save{appearance:none;font:inherit;cursor:pointer;border:1px solid #0000;border-radius:8px;padding:5px 14px;font-size:13px;line-height:1.5}.pI3cIq_discard{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);background:0 0}.pI3cIq_discard:hover:not(:disabled){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-dimmed)}.pI3cIq_save{background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-3)}.pI3cIq_discard:disabled,.pI3cIq_save:disabled{opacity:.4;cursor:default}.pI3cIq_discard:focus-visible,.pI3cIq_save:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}";
		const tagId = "@ticoguo/dsh-balance-check/BalanceCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@ticoguo/dsh-balance-check";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var BalanceCard_module_css_default = {
			"badge": "pI3cIq_badge",
			"card": "pI3cIq_card",
			"description": "pI3cIq_description",
			"header": "pI3cIq_header",
			"chevronOpen": "pI3cIq_chevronOpen",
			"badges": "pI3cIq_badges",
			"masked": "pI3cIq_masked",
			"field": "pI3cIq_field",
			"chevron": "pI3cIq_chevron",
			"input": "pI3cIq_input",
			"head": "pI3cIq_head",
			"howto": "pI3cIq_howto",
			"howtoTitle": "pI3cIq_howtoTitle",
			"name": "pI3cIq_name",
			"footer": "pI3cIq_footer",
			"body": "pI3cIq_body",
			"headText": "pI3cIq_headText",
			"discard": "pI3cIq_discard",
			"howtoStep": "pI3cIq_howtoStep",
			"badgeMuted": "pI3cIq_badgeMuted",
			"hint": "pI3cIq_hint",
			"failed": "pI3cIq_failed",
			"save": "pI3cIq_save",
			"code": "pI3cIq_code",
			"cardOpen": "pI3cIq_cardOpen",
			"label": "pI3cIq_label"
		};
		//#endregion
		//#region lib/types/client/BalanceCard.js
		/**
		* The balance-check plugin-configuration card. It mirrors the shared plugin
		* card chrome (Settings → Plugins → Plugin configuration) visually, but is
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
			return (0, react_jsx_runtime.jsxs)("div", {
				className: BalanceCard_module_css_default.field,
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: BalanceCard_module_css_default.head,
						children: [(0, react_jsx_runtime.jsx)("label", {
							className: BalanceCard_module_css_default.label,
							htmlFor: props.id,
							children: props.label
						}), (0, react_jsx_runtime.jsx)("span", {
							className: BalanceCard_module_css_default.badges,
							children: (0, react_jsx_runtime.jsx)("span", {
								className: props.state.configured ? BalanceCard_module_css_default.badge : BalanceCard_module_css_default.badgeMuted,
								children: props.state.configured ? props.configuredLabel : props.unconfiguredLabel
							})
						})]
					}),
					props.state.configured && (0, react_jsx_runtime.jsx)("div", {
						className: BalanceCard_module_css_default.masked,
						"aria-label": props.configuredLabel,
						children: props.state.masked
					}),
					(0, react_jsx_runtime.jsx)("input", {
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
					(0, react_jsx_runtime.jsx)("p", {
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
			return (0, react_jsx_runtime.jsxs)("li", {
				className: open ? BalanceCard_module_css_default.cardOpen : BalanceCard_module_css_default.card,
				children: [(0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: BalanceCard_module_css_default.header,
					"aria-expanded": open,
					onClick: () => {
						setOpen(!open);
					},
					children: [
						(0, react_jsx_runtime.jsxs)("span", {
							className: BalanceCard_module_css_default.headText,
							children: [(0, react_jsx_runtime.jsx)("span", {
								className: BalanceCard_module_css_default.name,
								children: title
							}), (0, react_jsx_runtime.jsx)("span", {
								className: BalanceCard_module_css_default.description,
								children: t("cardDescription")
							})]
						}),
						state.dirty ? (0, react_jsx_runtime.jsx)("span", {
							className: BalanceCard_module_css_default.pending,
							children: t("unsaved")
						}) : null,
						(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, { className: open ? BalanceCard_module_css_default.chevronOpen : BalanceCard_module_css_default.chevron })
					]
				}), open && (0, react_jsx_runtime.jsxs)("div", {
					className: BalanceCard_module_css_default.body,
					children: [
						(0, react_jsx_runtime.jsx)(SecretField, {
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
						(0, react_jsx_runtime.jsx)(SecretField, {
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
						(0, react_jsx_runtime.jsxs)("section", {
							className: BalanceCard_module_css_default.howto,
							children: [
								(0, react_jsx_runtime.jsx)("h4", {
									className: BalanceCard_module_css_default.howtoTitle,
									children: t("howToTitle")
								}),
								(0, react_jsx_runtime.jsx)("p", {
									className: BalanceCard_module_css_default.howtoStep,
									children: t("howToStep1")
								}),
								(0, react_jsx_runtime.jsx)("code", {
									className: BalanceCard_module_css_default.code,
									children: USER_TOKEN_SNIPPET
								}),
								(0, react_jsx_runtime.jsx)("p", {
									className: BalanceCard_module_css_default.howtoStep,
									children: t("howToStep2")
								})
							]
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: BalanceCard_module_css_default.footer,
							children: [
								state.failed ? (0, react_jsx_runtime.jsx)("p", {
									className: BalanceCard_module_css_default.failed,
									role: "status",
									children: t("failed")
								}) : null,
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: BalanceCard_module_css_default.discard,
									disabled: !state.dirty || state.saving,
									onClick: props.discard,
									children: t("discard")
								}),
								(0, react_jsx_runtime.jsx)("button", {
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
		//#region lib/types/client/balance-card-controller.js
		/**
		* The balance-check card's form. It is credentials-only: the DeepSeek API key
		* and platform token are the two write-only controls. The card shows each
		* configured secret as a MASKED string read from the host /balance route (the
		* literal never rides a response), and writes a new value through the
		* credentials domain. The endpoint and recharge-page overrides stay out of the
		* card — they are deployment-level settings, not user fields.
		*
		* Self-contained on purpose: a third-party client plugin may not value-import
		* the settings-plugins card chrome (the client bundle purity gate), so the form
		* lives here.
		*/
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
			queryBalance;
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
			* @param queryBalance - fetches the host /balance route (masked credentials).
			*/
			constructor(scope, api, queryBalance) {
				this.scope = scope;
				this.api = api;
				this.queryBalance = queryBalance;
				this.store = (0, _deepseek_ai_dsh_client_runtime_client.createSnapshotStore)(this.projection());
				scope.subscribe(() => {
					this.publish();
				});
				this.readConfigured();
			}
			/** Read the masked configured values and each credential's writability. */
			async readConfigured() {
				try {
					const balance = await this.queryBalance();
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
					available: this.scope.getSnapshot().status === "ready",
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
		//#region lib/types/client/locales.js
		/**
		* Locale bundles for the balance-check card and its controls. The namespace is
		* `balance-check`, declared on the card's slot registration; the browser locale
		* service resolves it against these dictionaries.
		*/
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
			saving: "Saving…",
			discard: "Discard",
			unsaved: "Unsaved",
			failed: "The deployment did not accept these values; they were left for you to correct."
		};
		/** Simplified Chinese copy. */
		const zh = {
			cardTitle: "余额显示",
			cardDescription: "在输入框旁显示 DeepSeek 账户余额，并展示消费金额与 Tokens 用量。",
			apiKey: "DeepSeek API Key",
			apiKeyHint: "以 \"sk-\" 开头，在 https://platform.deepseek.com/api_keys 创建。输入新值即可替换当前密钥。",
			userToken: "平台登录态 Token",
			userTokenHint: "platform.deepseek.com 的登录态令牌，仅用于消费金额与 Tokens 用量。输入新值即可替换当前 token。",
			configured: "已配置",
			unconfigured: "未配置",
			replaceKey: "输入新密钥以替换",
			replaceToken: "输入新 token 以替换",
			howToTitle: "如何获取平台登录态 token",
			howToStep1: "登录 https://platform.deepseek.com 后，打开浏览器控制台（F12），执行：",
			howToStep2: "把打印出来的值（引号中间的纯文本）复制到上方输入框。",
			save: "保存",
			saving: "保存中…",
			discard: "放弃修改",
			unsaved: "未保存",
			failed: "本部署没有接受这些值，已保留供你修改。"
		};
		//#endregion
		//#region lib/types/client/index.js
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
		* Client plugin body: mount the balance button and the plugin-configuration card.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			const { api } = ctx.get("connection");
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-balance-check: card dictionaries");
			const card = new BalanceCardController(ctx.settingsScope.bind({ namespace: BALANCE_NS }), api, queryBalance);
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
				id: "balance-check",
				order: 30,
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