import React, { useEffect,useState } from 'react'
import "../assets/css/profileNav.css"
import bell from "../assets/images/bell.png"
import ScriptTag from 'react-script-tag';
import silhouette from "../assets/images/profile.png"
import { propTypes } from 'react-bootstrap/esm/Image';

const ProfileNav = (props) => {
    const [profile,setProfile] = useState();
    const [auth,setAuth] = useState(false)
    const getProfile = () => {
        fetch(`http://localhost:5000/users/me`,  {credentials: "include"})
        .then(async response => {
            if(response.ok){
                response.json().then(data => {
                    if(data.password === undefined){
                        setProfile(data.user)
                        props.getName(data.user.name)
                    }
                    else
                    {
                        setProfile(data)
                        props.getName(data.name)
                    }
                    
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
          useEffect(() =>{
            getProfile()
        }, [])

        let authPic;
        if(profile===undefined)
        {
            authPic= (<img style={{borderRadius: "50%"}} src={silhouette} alt="profile_pic"/>)
        }
        else
        {
            if(profile.profilePicLink===undefined)
            {

                if(profile.profilePic === undefined){
                    console.log(profile)
                    authPic=(<img style={{borderRadius: "50%"}} src={silhouette} alt="profile_pic"/>)
                }else{
                    console.log(profile)
                    const profilePic = new Buffer(profile.profilePic.data).toString("base64")
                    authPic=(<img style={{borderRadius: "50%"}} src={`data:image/png;base64,${profilePic}`} alt="profile_pic"/>)

                }
            }
            else
            {
                authPic = (<img  style={{borderRadius: "50%"}} src={profile.profilePicLink} alt="profile_pic"/> )
            }
        }

    return (
        <div>
             <ScriptTag type="text/javascript" src="/js/profileNav.js"/>
    <div className="wrapper">
    <div className="profileNav">
        <div className="profileNav_left">
        
        </div>

        <div className="profileNav_right">
        <div className="notifications">
            <div className="icon_wrap"><img style={{marginBottom:"20px"}}src={bell}/></div>
            
            <div className="notification_dd" style={{zIndex:"1"}}>
                <ul className="notification_ul">
                    <li className="starbucks success">
                        <div className="notify_icon">
                            <span className="icon"></span>  
                        </div>
                        <div className="notify_data">
                            <div className="title">
                                Lorem, ipsum dolor.  
                            </div>
                            <div className="sub_title">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        </div>
                        <div className="notify_status">
                            <p>Success</p>  
                        </div>
                    </li>  
                    <li className="baskin_robbins failed">
                        <div className="notify_icon">
                            <span className="icon"></span>  
                        </div>
                        <div className="notify_data">
                            <div className="title">
                                Lorem, ipsum dolor.  
                            </div>
                            <div className="sub_title">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        </div>
                        <div className="notify_status">
                            <p>Failed</p>  
                        </div>
                    </li> 
                    <li className="mcd success">
                        <div className="notify_icon">
                            <span className="icon"></span>  
                        </div>
                        <div className="notify_data">
                            <div className="title">
                                Lorem, ipsum dolor.  
                            </div>
                            <div className="sub_title">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        </div>
                        <div className="notify_status">
                            <p>Success</p>  
                        </div>
                    </li>  
                    <li className="pizzahut failed">
                        <div className="notify_icon">
                            <span className="icon"></span>  
                        </div>
                        <div className="notify_data">
                            <div className="title">
                                Lorem, ipsum dolor.  
                            </div>
                            <div className="sub_title">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        </div>
                        <div className="notify_status">
                            <p>Failed</p>  
                        </div>
                    </li> 
                    <li className="kfc success">
                        <div className="notify_icon">
                            <span className="icon"></span>  
                        </div>
                        <div className="notify_data">
                            <div className="title">
                                Lorem, ipsum dolor.  
                            </div>
                            <div className="sub_title">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        </div>
                        <div className="notify_status">
                            <p>Success</p>  
                        </div>
                    </li> 
                    <li className="show_all">
                        <p className="link">Show All Activities</p>
                    </li> 
                </ul>
            </div>
            
        </div>
        <div className="profile">
            <div className="icon_wrap">
            {auth ? 
            authPic
            :<img  style={{borderRadius: "50%"}} src={silhouette} alt="profile_pic"/> } 
            <span className="name">{auth ? `Hello, ${profile.name} `: `Sign In`}</span>
            <i className="fa fa-chevron-down"></i>
            </div>

            <div className="profile_dd" style={{zIndex:"1"}}>
            <ul className="profile_ul"> 
                <li className="profile_li"><a className="profile" href="#"><span className="picon"><i className="fa fa-user"></i>
                    </span>Profile</a>
                    <a href="/myAccount">
                <div className="btn">My Account</div>
                </a>
                </li>
                <li><a className="logout" href="http://localhost:5000/users/logout"><span className="picon"><i className="fa fa-sign-out"></i></span>Logout</a></li>
            </ul>
            </div>
        </div>
        </div>
    </div>
    
    <div className="popup" style={{zIndex:"10"}}>
        <div className="shadow"></div>
        <div className="inner_popup">
            <div className="notification_dd">
                <ul className="notification_ul">
                    <li className="title">
                        <p>All Notifications</p>
                        <p className="close"><i className="fa fa-times" aria-hidden="true"></i></p>
                    </li> 
                    <li className="starbucks success">
                        <div className="notify_icon">
                            <span className="icon"></span>  
                        </div>
                        <div className="notify_data">
                            <div className="title">
                                Lorem, ipsum dolor.  
                            </div>
                            <div className="sub_title">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        </div>
                        <div className="notify_status">
                            <p>Success</p>  
                        </div>
                    </li>  
                    <li className="baskin_robbins failed">
                        <div className="notify_icon">
                            <span className="icon"></span>  
                        </div>
                        <div className="notify_data">
                            <div className="title">
                                Lorem, ipsum dolor.  
                            </div>
                            <div className="sub_title">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        </div>
                        <div className="notify_status">
                            <p>Failed</p>  
                        </div>
                    </li> 
                    <li className="mcd success">
                        <div className="notify_icon">
                            <span className="icon"></span>  
                        </div>
                        <div className="notify_data">
                            <div className="title">
                                Lorem, ipsum dolor.  
                            </div>
                            <div className="sub_title">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        </div>
                        <div className="notify_status">
                            <p>Success</p>  
                        </div>
                    </li>  
                    <li className="pizzahut failed">
                        <div className="notify_icon">
                            <span className="icon"></span>  
                        </div>
                        <div className="notify_data">
                            <div className="title">
                                Lorem, ipsum dolor.  
                            </div>
                            <div className="sub_title">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        </div>
                        <div className="notify_status">
                            <p>Failed</p>  
                        </div>
                    </li> 
                    <li className="kfc success">
                        <div className="notify_icon">
                            <span className="icon"></span>  
                        </div>
                        <div className="notify_data">
                            <div className="title">
                                Lorem, ipsum dolor.  
                            </div>
                            <div className="sub_title">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        </div>
                        <div className="notify_status">
                            <p>Success</p>  
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
    </div>
        </div>
    )
}

export default ProfileNav
