/**
 * @description 封装一个 Input 框
 * @param {Object} param0
 * @param {*} param0.title Input 标题
 * @param {*} param0.id    Input id
 * @param {*} param0.type  Input 类型，默认是“text”
 * @param {*} param0.value Input 值
 * @param {*} param0.onChange Input onChange 事件
 *  */
function AppInput({ title, id, type, value, onChange, error }) {
  return (
    <article className="app-input">
      <input id={id} type={type || "text"} value={value} onChange={onChange} required="required" /> 
      <label htmlFor={id}>{error === "" ? title : <span>{error}</span>}</label>
    </article>
  );
}

export default AppInput;
