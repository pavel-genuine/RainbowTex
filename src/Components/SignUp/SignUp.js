import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser, googleAuth } from "../../api/api";
import { fetchSignUp } from "../../redux/features/authSection/signUpSlice";
import './SignUp.css'
import toast, { Toaster } from 'react-hot-toast';


const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [showPassword, setShowPassword] = useState(false)
    const [showBtn, setShowBtn] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const navigate = useNavigate();
    const token =localStorage.getItem('loginToken')

  
    const handleShowPassword = () => {
        setShowPassword(true)
        setShowBtn(false)
    }
    const handleHidePassword = () => {
        setShowPassword(false)
        setShowBtn(true)
    }

    const { isLoading, error, signUp } = useSelector(state => state?.signUp)

    const dispatch = useDispatch()


    const onSubmit = async (data) => {
        const name = data?.name
        const email = data?.email
        const password = data?.password
        // const { data: res } = await createUser({ name, email, password })
        // console.log('res', res);
        const submit = dispatch(fetchSignUp({ name, email, password }))

        setTimeout(() => {
            toast.success("Congratulation! You've signed up, please verify you email.")
        }, 1000);
        setTimeout(() => {
            navigate('/');
        }, 2000);

        console.log(submit, 'submit');
        return submit;


    }

    return (
        <div style={{ backgroundImage: `url(${'https://i.ibb.co/WFbg3T0/background1-1.jpg'})` }}
            className={` min-h-screen md:h-[120vh] h-[150vh] md:w-[100%] w-[150%] `}>
                        <Toaster></Toaster>

            <div className="md:w-[100%] min-h-screen md:h-[120vh] h-[151vh]  bg-black bg-opacity-50  flex flex-col justify-center items-center ">
                <div className="md:w-[30%] w-[100%] h-screen md:h-auto bg-black bg-opacity-80 shadow-xl md:mt-28 pt-16 md:py-5 ">
                    <div className="card-body w-96 mx-auto py-10   ">
                        <h2 className="text-center text-white text-4xl mb-6 font-bold">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control w-full max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="outline-0 px-2 py-3 w-full max-w-xs rounded bg-[#333] text-white border-b-[red]"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is Required'
                                        }
                                    })}
                                />

                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-[#e87c03]">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="outline-0 px-2 py-3 w-full max-w-xs rounded bg-[#333] text-white border-b-[red]"
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
                            <div className="form-control w-full max-w-xs my-2">
                                <div className="flex">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        className="outline-0 px-2 py-3 input-bordered w-full max-w-xs rounded-l rounded-r-0 bg-[#333] text-white"
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
                                            <div onClick={handleShowPassword} className="bg-[#333] rounded-r text-[grey] py-3 px-2 cursor-pointer">
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
                            {/* <Link to="/"> */}
                                <input className='px-4 py-3 font-bold rounded w-full max-w-xs text-white bg-[#e50914] hover:bg-[#e50914] cursor-pointer mt-4 mb-2' type="submit" value="Sign Up" />

                            {/* </Link> */}
                        </form>
                        {/* <p><small>Don't have an account <Link className='text-primary' to="/sign_up">Create New Account</Link></small></p>
                <div className="divider">OR</div> */}
                        <button onClick={() => googleAuth()} className=" px-4 py-3 font-bold rounded w-full max-w-xs  cursor-pointer mt-4 mb-2 space-x-2 flex items-center justify-center bg-white ">
                            <img src="https://www.100ms.live/_next/image?url=%2Fassets%2Fhero%2Fgoogle.svg&w=32&q=75" alt="" /> <span className="font-bold">Start with Google</span>
                        </button>

                    </div>
                </div>
                <div className="bg-black bg-opacity-90 w-[100%] md:mt-20 h-[33%] md:h-auto  py-5 text-[grey] ">
                    <div className="w-[80%] mx-auto mt-20 md:mt-auto">
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

export default SignUp;