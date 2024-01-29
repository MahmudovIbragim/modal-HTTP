import { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import axios from "axios";
import Render from "../render/Render";
import style from "../contents/ContentStyle.module.css";

const link = "https://crudcrud.com/api/8d96ed67f90e4b8d90c9e6234f367931/ded";

const Contents = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [data, setData] = useState([]);

  const [updateId, setUpdateId] = useState("");
  const dateQuestions = [
    {
      id: Math.random(),
      question: "ЧТО ТАКОЕ СОБЫТИЯ REACT?",
    },
    {
      id: Math.random(),
      question: "ЧТО ТАКОЕ КОМПОНЕНТЫ REACT?",
    },
    {
      id: Math.random(),
      question: "ПОЧЕМУ КОМПОНЕНТЫ ТАК ВАЖНЫ ДЛЯ REACT?",
    },
    {
      id: Math.random(),
      question: "ЧТО ТАКОЕ REACT.JS?",
    },
    {
      id: Math.random(),
      question: "В ЧЕМ ОСНОВНОЕ РАЗЛИЧИЕ МЕЖДУ PROPS И СОСТОЯНИЕМ?",
    },
    {
      id: Math.random(),
      question: "ЧТО ТАКОЕ JSX?",
    },
    {
      id: Math.random(),
      question: "ЧТО ТАКОЕ ВИРТУАЛЬНЫЕ МОДЕЛИ DOM И КАК ОНИ РАБОТАЮТ?",
    },
    {
      id: Math.random(),
      question: "ПОЧЕМУ ВЫ ВЫБРАЛИ REACT?",
    },
  ];

  const [questions, setQuestions] = useState(dateQuestions);
  const [randomList, setRandomList] = useState([]);

  const randomQuestions = () => {
    const ran = Math.floor(Math.random() * questions.length);
    const res = questions[ran];
    setRandomList([res]);
  };

  useEffect(() => {
    getFunc();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const getFunc = async () => {
    try {
      const response = await axios.get(link);
      setData(response.data);
      console.log("Data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const postFunc = async () => {
    try {
      const newData = {
        id: Math.random(),
        title: input,
        language: select,
      };
      const response = await axios.post(link, newData);
      console.log("Data posted:", response.data);
      getFunc();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setInput('')
    try {
      await postFunc();
      closeModal();
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const deleteFunc = async (id) => {
    try {
      await axios.delete(`${link}/${id}`);
      getFunc();
    } catch (error) {
      console.error(error);
    }
  };

  const upDateFuncValue = (id) => {
    setUpdateId(id);
    openModal();
  };

  const upDateFunc = async () => {
    try {
      const updatedData = { title: input, language: select };
      await axios.put(`${link}/${updateId}`, updatedData);
      getFunc();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className={style.buttons}>
          <button className={style.btn} onClick={openModal}>
            Модал
          </button>
          <button className={style.btn} onClick={randomQuestions}>
            Random Question
          </button>
        </div>
        <Modal open={modalOpen} onClose={closeModal}>
          <p>кнопка х верхний правый угол</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="Html">Html</option>
            <option value="Css">Css</option>
            <option value="React">React</option>
            <option value="JS">JS</option>
          </select>
          <button onClick={handleFormSubmit}>Добавить</button>
          <button onClick={() => upDateFunc(randomList[0]?.id)}>Update</button>
        </Modal>
      </div>

      <div className={style.mapping}>
        <Render
          data={data}
          deleteFunc={deleteFunc}
          upDateFuncValue={upDateFuncValue}
          randomList={randomList}
        />
      </div>
    </>
  );
};

export default Contents;
