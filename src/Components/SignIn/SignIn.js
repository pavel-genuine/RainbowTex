
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { base_url, googleAuth, signInUser } from "../../api/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './SignIn.css'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignIn } from "../../redux/features/authSection/signInSlice";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [showPassword, setShowPassword] = useState(false)
    const [showBtn, setShowBtn] = useState(true)

    const [stayLoggedIn, setStay] = useState(false);


    const loginTokenControl = async () => {
        const { data } = await axios.get(
            `${base_url}/auth/google_login_token`
        );
        if (data) {
            localStorage.setItem("loginToken", data?.loginToken);
        } else {
            console.error(
                "Something went wrong couldn't make your request!Please try again later"
            );
        }
        setStay(false); //to disappear the button
    };



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const handleShowPassword = () => {
        setShowPassword(true)
        setShowBtn(false)
    }
    const handleHidePassword = () => {
        setShowPassword(false)
        setShowBtn(true)
    }


    const res = useSelector(state => state?.signIn)
    console.log(res, 'signin');
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const submit = dispatch(fetchSignIn(data))
        // console.log(submit, 'submit');
        return submit;
    }
    const navigate = useNavigate();
    const token = localStorage.getItem('loginToken')

    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (token) {
            setTimeout(() => {
                toast.success('SignIn Successfull')
            }, 500);

            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1000);

            setTimeout(() => {
                window?.location.reload()
            }, 1500);

        }
    }, [token])

    return (
        <div style={{ backgroundImage: `url(${'https://i.ibb.co/WFbg3T0/background1-1.jpg'})`, backgroundSize: 'cover' }}
            className={`md:relative h-[900px]  md:h-[1000px] md:w-[100%]  bg-cover `}>
            <Toaster></Toaster>
            <div className="w-[100%] bg-black h-[900px] bg-cover min-h-screen   md:h-[1000px] bg-opacity-50  flex flex-col justify-center items-center">
                <div className="flex justify-center items-center md:w-[500px] w-[100vw] bg-black h-screen md:absolute bottom-[35%]  md:h-auto bg-opacity-80 shadow-xl md:mt-28 pt-40 md:py-10  ">
                    <div>
                        <div className="card-body flex justify-center items-center my-auto  ">
                            <h2 className="text-center text-white text-4xl mb-6 font-bold">Sign In</h2>
                            <form className="flex justify-center items-center flex-col" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control w-full max-w-xs flex justify-center items-center">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="outline-0 px-2 py-3 lg:w-[150%] w-[100%]  rounded bg-[#333] text-white border-b-[red]"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: 'Email is Required'
                                            },
                                            pattern: {
                                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                                message: 'Provide a valid Email'
                                            }
                                        })}
                                    />

                                    <label className="label">
                                        {errors.email?.type === 'required' && <span className="label-text-alt text-[#e87c03]">{errors.email.message}</span>}
                                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-[#e87c03]">{errors.email.message}</span>}
                                    </label>
                                </div>
                                <div className="form-control w-full max-w-xs flex justify-center items-center">
                                    <div className="flex lg:w-[150%] w-[100%] ">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            className="outline-0 px-2 py-3 lg:w-[150%] w-[100%]  rounded bg-[#333] text-white border-b-[red]"
                                            {...register("password", {
                                                required: {
                                                    value: true,
                                                    message: 'Password is Required'
                                                },
                                                minLength: {
                                                    value: 6,
                                                    message: 'Must be 6 characters or longer'
                                                }
                                            })}
                                        />
                                        {
                                            showBtn ?
                                                <div onClick={handleShowPassword} className="bg-[#333]  rounded-r text-[grey] py-3 px-2 cursor-pointer">
                                                    SHOW
                                                </div>
                                                :
                                                <div onClick={handleHidePassword} className="bg-[#333] rounded-r text-[grey] py-3 px-2 cursor-pointer">
                                                    HIDE
                                                </div>
                                        }
                                    </div>
                                    <label className="label">
                                        {errors.password?.type === 'required' && <span className="label-text-alt text-[#e87c03]">{errors.password.message}</span>}
                                        {errors.password?.type === 'minLength' && <span className="label-text-alt text-[#e87c03]">{errors.password.message}</span>}
                                    </label>
                                </div>


                                <div className="  flex flex-col justify-center items-center lg:w-[150%] w-[100%]  ">
                                    <input className='px-4 py-3 font-bold rounded w-full  text-white bg-[#e50914]  cursor-pointer mt-4 mb-2' type="submit" value="Sign In" />
                                    <label onClick={async () => {
                                    const x = window.open(
                                        `${base_url}/auth/google`,
                                        "_blank"
                                    );
                                    setStay(true);
                                    // x.focus();


                                }}
                                    className=" px-4 py-3 font-bold rounded w-full  cursor-pointer mt-4 space-x-2 flex items-center justify-center bg-white ">
                                    <img src="https://www.100ms.live/_next/image?url=%2Fassets%2Fhero%2Fgoogle.svg&w=32&q=75" alt="" /> <span className="font-bold">Start with Google</span>
                                </label>
                                </div>

                                

                            </form>



                            {/* <div>
                            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
                            <label for="my-modal-4" class="modal cursor-pointer">
                            <label class="modal-box relative bg-slate-800 h-[40vh] flex justify-center items-center" for="">
                            <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                <div class="modal-action">
                                    {stayLoggedIn && (
                                        <label for="my-modal-4" className="px-4 py-3 font-bold rounded mb-10  bg-[brown] text-white  cursor-pointer m-auto"
                                            onClick={loginTokenControl}>Stay LoggedIn with google.</label>

                                    )}
                               
                                </div>
                            </label>
                            </label>
                        </div> */}


                        </div>
                    </div>
                </div>

                <div className="md:absolute bottom-[0] bg-black bg-opacity-90 w-[100%] md:mt-20  md:h-auto  md:py-10 py-40 text-[grey] ">
                    <div className="w-[80%] mx-auto">
                        <Link to={`/contact-us`}><span className="text-lg hover:underline mb-5">Questions? Contact us.</span></Link>
                        <div className="grid grid-cols-3 md:space-y-3 mt-5">
                            <Link to={`/about-us`}><p className="hover:underline">About Us</p></Link>
                            <Link to={``}><p className="hover:underline">FAQ</p></Link>
                            <Link to={``}><p className="hover:underline">Terms of Use</p></Link>
                            <Link to={``}><p className="hover:underline">Privacy</p></Link>
                            <Link to={``}><p className="hover:underline">Cookie Preferences</p></Link>
                            <Link to={``}><p className="hover:underline">Corporate Information</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SignIn;