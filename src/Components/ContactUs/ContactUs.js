
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'

const ContactUs = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const onSubmit = async (data) => {
        const email = data?.email
        const message = data?.message
    }

    return (
        <div className='min-h-screen pt-20 bg-[#181818] text-white'>

            <div className='divide-y pt-10 md:px-20 px-10 space-y-10'>

                <h1 className='text-4xl font-bold'>Contact Customer Service</h1>
                <div className='space-y-2 pt-5'>
                    <h3 className='text-2xl font-bold'>Call us from our app</h3>
                    <p>
                        Contacting us is now easier than ever when you contact us from the our app on your Android or iOS phone or tablet! Calling through the app is free - all you need is an internet or cellular connection.
                    </p>
                </div>
                <div className='space-y-2 pt-3'>
                    <h3 className='text-2xl font-bold'>Email us</h3>
                    <p>
                        You will need an internet or mobile phone connection.
                    </p>
                    <label for="my-modal-4" class="btn modal-button">Email Us</label>
                    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
                    <label for="my-modal-4" class="modal cursor-pointer">
                        <label class="modal-box relative" for="">
                            <div className='h-[65vh] md:h-[45vh]'>
                                <label for="review" class="block text-lg font-semibold text-black mb-5 "> Email Us </label>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control w-full max-w-xs">
                                        <input
                                            style={{ backgroundColor: '#e8e7e9', border: '#0c0c0c' }}
                                            type="email"
                                            placeholder="Email"
                                            className="text-black shadow-sm  mt-1 block w-full sm:text-sm border rounded-md p-2"
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
                                    <textarea style={{ backgroundColor: '#e8e7e9', border: '#0c0c0c' }}
                                        placeholder="Message"
                                        id="review" name="review" rows="8"
                                        className="text-black shadow-sm  mt-1 block w-full sm:text-sm border  rounded-md p-2"
                                        {...register("review")}>
                                    </textarea>
                                    <input className='btn bg-[#050535] w-full max-w-xs text-white my-3' type="submit" value="Submit" />

                                </form>
                            </div>
                        </label>
                    </label>
                </div>
                <div className='space-y-2 pt-3'>
                    <h3 className='text-2xl font-bold'>Live Chat</h3>
                    <p>
                        You will need an internet or mobile phone connection.
                    </p>
                    <button className='btn'>
                        Start Live Chat
                    </button>
                </div>

            </div>

            <Footer></Footer>

        </div>
    )
}

export default ContactUs