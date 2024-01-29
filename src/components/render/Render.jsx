import Style from "../render/RenderStyle.module.css";

const Render = ({ data, deleteFunc, upDateFuncValue, randomList }) => {
  return (
    <>
      <div className={Style.cards}>
        <div className={Style.container}>
          {data.map((item) => (
            <div className={Style.box} key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.language}</p>
              <div className={Style.buttons}>
                <button onClick={() => deleteFunc(item._id)}>Удалить</button>
                <button onClick={() => upDateFuncValue(item._id)}>
                  Обновить
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={Style.container}>
          {randomList.map((item) => (
            <div className={Style.box} key={item.id}>
              <h3 key={item.id}>{item.question}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Render;
