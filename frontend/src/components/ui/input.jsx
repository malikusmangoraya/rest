export const Input = (props) => <input {...props} className={["w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500", props.className || ""].filter(Boolean).join(" ")} />;
export default Input;
