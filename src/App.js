import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";

const LI = styled.li`
&.on {
    color: #ddd;
    text-decoration: line-through;
}
`

const App = () => {
  const [list, setList] = useState([]);
  const [itm, setItm] = useState({
    title: '',
    content: ''
  });

  const num = useRef(1);

  const onChange = e => {
    const { value, name } = e.target
    setItm({
      ...itm,
      id: num.current,
      [name]: value,
      done: false
    })
  }

  const onClick = () => {
    if (itm.title.length < 2) {
      alert('more...')
      return
    }
    setList([
      ...list,
      itm
    ]);

    setItm({
      title: '',
      content: ''
    })

    num.current++;


  }

  const onDelete = (id) => {
    const r = list.filter(it => it.id !== id);
    setList(r)
  }

  const onModify = (id) => {
    console.log(id);
    const r = list.map(it => it.id === id ? { ...it, done: !it.done } : it);
    setList(r)
  }


  console.log(itm)
  return (
    <div>
      <ul>
        {
          list.map(it => {
            return (
              <LI key={it.id} className={it.done ? 'on' : ''}>
                {it.title} / {it.content}
                <button onClick={() => onDelete(it.id)}>DELETE</button>
                <button onClick={() => onModify(it.id)}>
                  {it.done ? 'do' : 'doit'}
                </button>
              </LI>
            )
          })
        }
      </ul>
      <input type="text" name='title' value={itm.title} onChange={onChange} />
      {/* <input type="text" name='content' value={itm.content} onChange={onChange} /> */}
      <button onClick={onClick}>WRITE</button>
    </div>
  )
}

export default App;