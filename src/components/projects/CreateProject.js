/* eslint-disable no-undef */
import React, { useState } from 'react';
import {createProject} from "../../store/actions/ProjectActions";
import {useDispatch,useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const CreateProject = (props) => {
    /* console.log(props) */
    const  dispatch=useDispatch()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [project,setProject]=useState("")
    
    const data=useSelector(state=>state.firebaseReducer)
    /* console.log(data) */
    const {auth:{uid}}=useSelector(state=>state.firebaseReducer)
    const {data:{users}}=useSelector(state=>state.firestoreReducer)
    const activeuser= users? users[uid]:null 
   /*  console.log(activeuser) */



    function handleChange(e) {
        switch (e.target.id) {
            case "title":
                setTitle(e.target.value)
                break;
            case "content":
                setContent(e.target.value)
                break;
        }
        setProject({title,content})
    }

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(e.target);
        
        dispatch(createProject(project,activeuser,uid))
         props.history.push("/")
        
    }


    const {auth} = useSelector(state => state.firebaseReducer)
    if(!auth.uid) return(<Redirect to="/signIn"/>)

    return (
        <div className="container">

            <form onSubmit={handleSubmit}>


                <h5 className="grey-text text-darken-3">Create New Project</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="content">Project Content</label>
                    <textarea name="content" id="content" className="materialize-textarea" onChange={handleChange}></textarea>
                </div>
                <div className="input-field">
                    <button className="btn lighten-1 z-deph-0">Create</button>
                </div>
            </form>
        </div>
    )

}

export default CreateProject;
