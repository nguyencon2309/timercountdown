import { useState, useEffect, useRef, useLayoutEffect } from "react"

import './CountTimer.css'

var [h, m, s] = [0, 2, 0]
const CountTimer = ({ tt }) => {
    const [id, setId] = useState("TimerId " + tt)
    const [arr, setArr] = useState(JSON.parse(localStorage.getItem('arr')) ?? [h, m, s])
    const [hours, setHours] = useState(arr[0])
    const [minutes, setMinutes] = useState(arr[1])
    const [seconds, setSeconds] = useState(arr[2])
    const [start, setStart] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editValue, setEditValue] = useState([...arr])//lưu giá trị edit
    //const [time,setTime] = useState(hours*3600+minutes*60+seconds)
    const all = hours * 3600 + minutes * 60 + seconds
    const x = arr[0] * 3600 + arr[1] * 60 + arr[2]
    const inRef = useRef()

    const setTime = (all) => {
        setSeconds(all % 60)
        setMinutes(Math.floor(all / 60) % 60)
        setHours(Math.floor(all / 3600))
    }
    useEffect(() => {

        if (all > 0 && start) {

            const timerId = setInterval(() => {
                // var elem=inRef.current()

                inRef.current.style.width = (all - 1) / x * 100 + '%';
                //setTime(all-1)   
                if (seconds > 0) setSeconds(seconds - 1)
                else if (minutes > 0) { setMinutes(minutes - 1); setSeconds(59) }
                else { setHours(hours - 1); setMinutes(59); setSeconds(59); }




            }, 1000
            )
            // console.log('setinterval timerid : ', timerId)

            return () => {
                clearInterval(timerId)
                // console.log('clear interval : ', timerId)
            }

        }
        setStart(false)

    }, [hours, minutes, seconds, start])
    const setCountdown = (hours, minutes, seconds) => (
        (hours > 9 ? hours : "0" + hours) +
        ":" +
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );

    const handleReset = () => {
        setHours(arr[0]);
        setMinutes(arr[1]);
        setSeconds(arr[2]);
        inRef.current.style.width = 100 + '%';
    }
    const abc = () => {

    }
    const handleChange = (e) => {

    }
    console.log(arr,editValue)

    return (
        <div className="counttimer">
            <div className="f1-row">
                <span>{setCountdown(hours, minutes, seconds)}</span>

                <button
                    onClick={() => { setStart(true); setEdit(false); }}
                    disabled={start}>
                    Start
                </button>
                <button onClick={() => setStart(false)} disabled={!start}>Stop</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="f2-row">
                {/* <input value={id} onChange={e=>setId(e.target.value)}/> */}
                <span>{id}  </span><span></span>
                (<span>{setCountdown(...arr)}</span>)
                <button 
                style={{background:'none',color:'blue',fontSize:'14px',border:'0'}}
                onClick={() => setEdit(!edit)} disabled={start}>Edit</button>


            </div>
            <div className="w3-light-grey" style={{ backgroundColor: 'gray', width: '100%', height: '24px' }}>
                <div ref={inRef} id="myBar" className="w3-green" style={{ backgroundColor: 'green', height: '100%', width: '100%', float: 'left' }}></div>
            </div>
            <hr></hr>


            {edit &&
                <div className="modal_form">
                    <div className='modal_container'>

                        <div className="modal-header">
                            <button
                                className="close-modal-btn"

                                onClick={() => {
                                    setEdit(!edit)
                                    setEditValue([...arr])
                                }}
                            >
                                &times;
                            </button>
                            <h3 className="modal-title" >Edit Form</h3>

                        </div >


                        <div className="modal-body">

                            <div className="modal-body-row1">



                                <div >

                                    <input type='number'
                                        value={editValue[0]}
                                        id='inputHour'
                                        onChange={
                                            e => {
                                                var a = Number('0' + e.target.value);
                                                a = Math.min(a, 99)
                                                var nArr = editValue;
                                                nArr[0] = a
                                                setEditValue([...nArr])
                                                e.target.value = a
                                            }

                                        }
                                        min={0} max={99}

                                    />

                                    <label for='inputHour'>Hrs</label>
                                </div>

                                <span >:</span>

                                <div >

                                    <input type='number'
                                        id='inputMinute'
                                        value={editValue[1]}
                                        onChange={
                                            e => {
                                                var a = Number('0' + e.target.value);
                                                a = Math.min(a, 59)
                                                var nArr = editValue;
                                                nArr[1] = a
                                                setEditValue([...nArr])
                                                e.target.value = a
                                            }

                                        }
                                        min={0} max={59}

                                    />

                                    <label for='inputMinute'
                                    >Mins</label>


                                </div>

                                <span >:</span>



                                <div >
                                    <input type='number'
                                        id='inputSecond'
                                        value={editValue[2]}
                                        onChange={e => {
                                            var a = Number('0' + e.target.value);
                                            a = Math.min(a, 59)
                                            var nArr = editValue;
                                            nArr[2] = a
                                            setEditValue([...nArr])
                                            e.target.value = a
                                        }
                                        }
                                        min={0} max={59} />

                                    <label for='inputSecond'>Secs</label>
                                </div>

                            </div>
                            <hr></hr>

                            <div className="modal-body-row2">

                                <label
                                    className="input_bl"
                                    for='timerName'
                                >
                                    Timer Name
                                </label>

                                <input
                                    value={id}
                                    id='timerName'
                                    onChange={e => setId(e.target.value)}
                                />

                            </div>
                            <hr></hr>





                        </div>





                        <div className="modal-footer">
                            <div>
                                <button
                                    onClick={() => {
                                        setArr([...editValue])
                                        setHours(editValue[0]);
                                        setMinutes(editValue[1]);
                                        setSeconds(editValue[2]);
                                        setEdit(!edit)
                                        localStorage.setItem('arr', JSON.stringify(arr))
                                    }
                                    }>Done</button>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}
export default CountTimer