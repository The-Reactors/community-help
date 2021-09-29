import React, { useEffect,useState } from 'react'
import "../assets/css/profileNav.css"
import bell from "../assets/images/bell.png"
import ScriptTag from 'react-script-tag';
import silhouette from "../assets/images/profile.png"
import nayakShort from "../assets/images/shortLogo.png"
import URL from '../URL';

const ProfileNav = (props) => {
    const [profile,setProfile] = useState();
    const [auth,setAuth] = useState(false)
    const [notifications,setNotifications] = useState([])
    const [notifcationsClass, setNotificationClass] = useState("notifications")
    
    const getProfile = () => {
        fetch(`${URL}/users/me`,  {credentials: "include"})
        .then(async response => {
            if(response.ok){
                response.json().then(data => {
                        setProfile(data)
                        props.getName(data.name)

                    setAuth(true)
                });
             }
            else{
                throw response.json();
            }
          })
          .catch(async (error) => {
            setAuth(false)
            const errorMessage = await error;
            console.log(errorMessage)
          })
    }
    const notificationHandler = () => {
        {notifcationsClass.localeCompare("notifications") === 0 ? setNotificationClass("notifications active") : setNotificationClass("notifications")}
    }
    const getNotifications = () => {
        fetch(`${URL}/getNotifications`,  {credentials: "include"})
        .then(async response => {
            if(response.ok){
                response.json().then(data => {
                 
                   setNotifications(data)
                });
             }
            else{
                throw response.json();
            }
          })
          .catch(async (error) => {
            setAuth(false)
            const errorMessage = await error;
            console.log(errorMessage)
          })
    }

          useEffect(() =>{
            getProfile()
            getNotifications()
        }, [])

        const markAsReadHandler = () => {

            const Options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include"
                };

            fetch(`${URL}/ticket/markAsRead`, Options)
            .then(async response => {
            if(response.ok){
                response.json().then(data => {
                      window.location.reload();
                });
             }
            else{
                throw response.json();
            }
          })
          .catch(async (error) => {
            const errorMessage = await error;
            console.log(errorMessage)
          })
        }
        let authPic;
        if(profile===undefined)
        {
            authPic= (<img style={{borderRadius: "50%"}} src={silhouette} alt="profile_pic_loggedOut"/>)
            
        }
        else
        {
            if(profile.profilePicLink===undefined)
            {

                if(profile.profilePic === undefined){
                   
                    authPic=(<img style={{borderRadius: "50%"}} src={silhouette} alt="profile_pic_NativeImage"/>)
                }else{
                   
                    const profilePic = new Buffer(profile.profilePic.data).toString("base64")
                    authPic=(<img style={{borderRadius: "50%"}} src={`data:image/png;base64,${profilePic}`} alt="profile_pic_NativePresent"/>)

                }
            }
            else
            {
                authPic = (<img style={{borderRadius: "50%"}} src={profile.profilePicLink} alt="profile_pic_google"/> )
            }
        }
       
            
        
    return (
        <div>
             <ScriptTag type="text/javascript" src="/js/profileNav.js"/>
    <div className="wrapper">
    <div className="profileNav">
        <div className="profileNav_left">
             {props.activePage.localeCompare("home") === 0 ?<h1><span className="fa fa-map-marker"style={{marginRight:"5px",color:"#3445B4"}}></span>Trending Issues Near You</h1>:null } 
        </div>

        <div className="profileNav_right">
        <div className={notifcationsClass}>
           {auth ? <div className="icon_wrap"><img onClick ={notificationHandler} style={{marginBottom:"20px"}}src={bell}/></div>:null} 
            <div className="notification_dd" style={{zIndex:"10"}}>
                <ul className="notification_ul">
                    {
                         notifications.map((notification, index) =>{
                           return <div key={index}>
                                      {notification.action.localeCompare("Upvote") === 0 ? 
                                      <li className="success">
                                          <div className="notify_icon">
                                                <span className="icon">
                                                    <img src={nayakShort}></img></span>  
                                            </div>
                                            <div className="notify_data">
                                                <div className="title">
                                                    <b>Title Of Ticket : </b>{notification.problemTitle} 
                                                </div>
                                                <div className="sub_title">
                                                {notification.notifierName} Upvoted Your Ticket With Title: <b>{notification.problemTitle}</b>
                                            </div>
                                            </div>
                                            <div className="notify_status">
                                            <span style={{color:"#6BDD8F"}} className="fa fa-thumbs-up fa-3x mr-3"></span>
                                            </div>
                                        </li>
                                        : <li className="failed">
                                            <div className="notify_icon">
                                                <span className="icon">
                                                <img src={nayakShort}></img></span>  
                                            </div>
                                            <div className="notify_data">
                                                <div className="title">
                                                <b>Title Of Ticket : </b> {notification.problemTitle}   
                                                </div>
                                                <div className="sub_title">
                                                {notification.notifierName} Downvoted Your Ticket With Title: <b>{notification.problemTitle}</b>
                                            </div>
                                            </div>
                                            <div className="notify_status">
                                            <span style={{color:"#FF1000"}} className="fa fa-thumbs-down fa-3x mr-3"></span>
                                            </div>
                                        </li>  
                                        } 
                                            
                                 </div>
                         })
                    }
                  <li className="show_all">
                        <p className="link" onClick={markAsReadHandler}><span style={{color:"#1E1E1E",cursor:"pointer"}} className="fa fa-check mr-3"></span>Mark As Read</p>
                    </li> 
                </ul>
            </div>
            
        </div>
        <div className="profile">
            <div className="icon_wrap">
            {auth ? 
            authPic
            :<a href="/login"><img style={{borderRadius: "50%"}} src={silhouette} alt="profile_pic"/> </a>} 
            <span className="name">{auth ? `Hello, ${profile.name} `: <a href="/login">Sign In</a>}</span>
            {auth ? <i className="fa fa-chevron-down"></i> : <a href="/login"><i className="fa fa-chevron-down"></i></a>}
            </div>

           {auth?<div className="profile_dd" style={{zIndex:"1"}}>
            <ul className="profile_ul"> 
                <li className="profile_li"><a className="profile" href="#"><span className="picon"><i className="fa fa-user"></i>
                    </span>Profile</a>
                    <a href="/myAccount">
                <div className="btn">My Account</div>
                </a>
                </li>
                <li><a className="logout" href={`${URL}/users/logout`}><span className="picon"><i className="fa fa-sign-out"></i></span>Logout</a></li>
            </ul>
            </div>:null} 
        </div>
        </div>
    </div>
    
    <div className="popup" style={{zIndex:"10"}}>
        <div className="shadow"></div>
       
    </div>
    
    </div>
        </div>
    )
}

export default ProfileNav
