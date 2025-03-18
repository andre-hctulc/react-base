import{j as o}from"./jsx-runtime-ClZEHPQQ.js";import{r as n}from"./index-Cqyox1Tj.js";import{c as a}from"./title-zhG8nq35.js";const d=n.createContext(null);function u(){const e=n.useContext(d);return e||null}const c=e=>{const r=u(),i=n.useRef(!1),t=e.checked!==void 0?e.checked?"on":"off":e.value,s=n.useRef(void 0);return n.useEffect(()=>{t!==void 0&&(i.current&&s.current!==t?r==null||r.triggerChange({name:e.name,value:t}):i.current=!0,s.current=t)},[t]),o.jsx("input",{...e,type:"hidden"})};c.__docgenInfo={description:`Hidden input (\`type="hidden"\`).

**Remember:** Hidden inputs do not trigger any change events natively

### In {@link JSForm}s
some behavior is added to hidden inputs:
- Hidden inputs will trigger change events when their value changes.
  This way we can use {@link useJSForm} to observe live state of hidden inputs.
- Validation props (e.g. *required*, *pattern*) will be used to validate the hidden input.`,methods:[],displayName:"HiddenInput"};a({base:"rounded-full flex border overflow-hidden",variants:{size:{sm:"text-sm h-6",md:"text-base h-8",lg:"text-lg h-10"},color:{primary:"text-primary",secondary:"text-secondary",error:"text-error",success:"text-success",warning:"text-warning",info:"text-info",neutral:"text-neutral"}},defaultVariants:{color:"primary",size:"md"}});export{c as H};
