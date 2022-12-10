import React, { useEffect, useRef } from "react";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import SideBar from "../SideBar";
import VideoUploader from "../PublishPost/VideoUploader";
import { useDispatch, useSelector } from "react-redux";
import {
    publishPost,
    singlePostGet,
} from "../../../redux/features/postSection/postSlice";
import { videoCoverAdd } from "../../../redux/features/postSection/videoCoverSlice";
import {
    addVideo,
    createPost,
    getSinglePost,
    uploadVideo,
} from "../../../api/api";
import useAllCategories from "../../Shared/useAllCategories";
import { categoryAdd } from "../../../redux/features/postSection/postCategorySlice";
import { useParams } from "react-router-dom";
import { updatePostText } from "../../../redux/features/postSection/postTextSlice";
import { thumbnailAdd } from "../../../redux/features/postSection/thumbnailSlice";

const EditPost = () => {
    const { id } = useParams();

    const { category } = useAllCategories();
    const dispatch = useDispatch();

    // const { isLoading, error, post: movie } = useSelector(state => state?.singlePost);
    const { postCategory } = useSelector((state) => state?.postCategory);
    const { postText } = useSelector((state) => state?.postText);
    const { videoCover } = useSelector((state) => state?.postVideoCover);
    const { videoThumbnail } = useSelector((state) => state?.postThumbnail);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const [movie, setMovie] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(movie?.genre);
    const [active, setActive] = useState(true);
    const [source, setSource] = useState("");
    const [progress, setProgress] = useState(0);
    const [selectedCate, setSelectedCate] = useState("");
    const [selectedCateName, setSelectedCateName] = useState("");
    const [coverPhoto, setCoverPhoto] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [updatedData, setUpdatedData] = useState({});
    const [postData, setPostData] = useState({
        videocover: null,
        thumbnail: null,
    });
    const showActive = useRef(movie?.isActive);

    useEffect(() => {
        // dispatch(singlePostGet(id))

        // console.log('movvvv',movie);

        const fetchSinglePost = async () => {
            const { data } = await getSinglePost(id);
            setMovie(() => data);
        };

        fetchSinglePost();
    }, [movie]);

    // console.log('mov',movie);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
        // console.log('src',source);
        const formData = new FormData();
        formData.append("video", file);
        formData.append("_id", movie?._id);

       const {data} = await addVideo(formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (data) => {
                setProgress(Math.round((100 * data.loaded) / data.total));
            },
        });
        
        // console.log(data,'ddd');

        toast.success("Video updated");

    };

    const onChangeCover = (data) => {
        setCoverPhoto(data);
        const image = data[0].file;
        const formData = new FormData();
        formData.append("_id", movie?._id);
        formData.append("videocover", image);
        dispatch(videoCoverAdd(formData));
        toast.success("Video cover updated");
    };

    const onChangeThumbnail = (data) => {
        const image = data[0].file;
        console.log(image, "img");
        setThumbnail(data);
        const formData = new FormData();
        formData.append("_id", movie?._id);
        formData.append("thumbnail", image);
        dispatch(thumbnailAdd(formData));
        toast.success("Thumbnail Updated");
    };

    const onChangeCategory = (e) => {
        setSelectedCate(() => e.target.value);
        console.log(selectedCate, "id");
        const selected = category?.categories?.find(
            (cate) => cate?._id == selectedCate
        );
        setSelectedCateName(() => selected?.categoryName);
        console.log(selectedCateName, "cateName");
        dispatch(categoryAdd({ postId: id, categoryId: e.target.value }));
        toast.success("Post category Updated");
    };

    const onChangeActive = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            showActive.current = true;
            setActive(() => true);
        } else {
            showActive.current = false;
            setActive(() => false);
        }
    };

    const onSubmit = async (data) => {
        const tags = data?.tags?.split(",");

        setUpdatedData((data) => ({
            ...data,
            genre: selectedGenre,
            tags: tags,
            _id: id,
        }));

        console.log(updatedData, "upd");

        if (movie?.isActive != active) {
            return dispatch(
                updatePostText({
                    ...data,
                    genre: selectedGenre,
                    tags: tags,
                    _id: id,
                    isActive: active,
                })
            );
        }
        dispatch(
            updatePostText({ ...data, genre: selectedGenre, tags: tags, _id: id })
        );

        toast.success("Post Text Updated");
    };

    // if (isLoading) {
    //     <p>loading...</p>
    // }

    return (
        <div className="bg-[#181818] text-slate-200 pt-[18.5%] md:pt-0">
            <Toaster></Toaster>
            <div className="md:hidden">
                <SideBar index={4} color={"[#e50914]"} className=""></SideBar>
            </div>
            <div className="mx-auto pt-[16.7%] md:pt-0  md:w-[100%] w-[90%] mx-auto  md:grid grid-cols-12 ">
                <div className="md:block hidden">
                    <SideBar index={4} color={"[#e50914]"} className=""></SideBar>
                </div>

                <div className="col-span-10  pb-10 mx-auto  md: md:pt-32 ">
                    <h2 className="text-2xl font-bold mb-10 ">Update information</h2>

                    <div>
                        <div className="flex flex-col">
                            <div className="md:flex items-center ">
                                <div className="mr-5">
                                    <div
                                        style={{
                                            zIndex: "0",
                                            backgroundColor: "black",
                                            backgroundRepeat: "no-repeat",
                                            backgroundAttachment: "",
                                            backgroundImage: `url(${movie?.videoCover?.cdnUrl && movie?.videoCover?.cdnUrl
                                                })`,
                                        }}
                                        class="bg-cover absolute border-slate-600 border border-b-0 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]  md:mx-auto shadow overflow-hidden sm:rounded-t-lg "
                                    >
                                        <div class="px-4 py-5 sm:px-6 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]"></div>
                                    </div>
                                    <ImageUploading
                                        value={coverPhoto}
                                        onChange={onChangeCover}
                                        dataURLKey="data_url"
                                    >
                                        {({ imageList, onImageUpload }) => (
                                            <div className="upload__image-wrapper relative text-black">
                                                <div class="mt-1 flex justify-center mb-8 mr-2 items-center px-6 pt-5 pb-6 border-2 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]  border-dashed rounded-md">
                                                    <div class="space-y-1 text-center">
                                                        <div class="flex text-sm text-gray-600">
                                                            <label
                                                                onClick={onImageUpload}
                                                                for="file-upload1"
                                                                class="relative cursor-pointer rounded-md font-bold text-white bg-black p-2 bg-opacity-80 hover:text-[brown] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                            >
                                                                <svg
                                                                    class="mx-auto h-8 w-8"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    viewBox="0 0 48 48"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path
                                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                        stroke-width="2"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    />
                                                                </svg>
                                                                <span>Update Video Cover</span>
                                                                <input
                                                                    style={{
                                                                        backgroundColor: " #919cb1",
                                                                        border: "#6b7280",
                                                                    }}
                                                                    class="sr-only"
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                {imageList?.map((image, index) => (
                                                    <div
                                                        style={{
                                                            zIndex: "1",
                                                            backgroundColor: "black",
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundAttachment: "",
                                                            backgroundImage: `url(${image?.data_url})`,
                                                        }}
                                                        class="bg-cover border-slate-600 border  md:w-[18vw] w-[90vw] h-[185px]  md:h-[205px]  md:mx-auto absolute top-[-2%] left-[0%]  shadow overflow-hidden rounded-lg"
                                                    >
                                                        <div class="px-4 py-5 sm:px-6 mr-2 ">
                                                            <p
                                                                title="Change cover"
                                                                onClick={onImageUpload}
                                                                className="absolute top-[2%] right-[1%] md:top-[0%] md:right-[1%]  btn btn-xs my-3 "
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="h-6 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                                                    />
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                </svg>
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>

                                <div>
                                    <div
                                        style={{
                                            zIndex: "0",
                                            backgroundColor: "black",
                                            backgroundRepeat: "no-repeat",
                                            backgroundAttachment: "",
                                            backgroundImage: `url(${movie?.thumbnail?.cdnUrl && movie?.thumbnail?.cdnUrl
                                                })`,
                                        }}
                                        class="z-0 bg-cover absolute border-slate-600 border border-b-0 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]  md:mx-auto shadow overflow-hidden sm:rounded-t-lg"
                                    >
                                        <div class="px-4 py-5 sm:px-6 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]"></div>
                                    </div>
                                    <ImageUploading
                                        value={thumbnail}
                                        onChange={onChangeThumbnail}
                                        dataURLKey="data_url"
                                    >
                                        {({ imageList, onImageUpload }) => (
                                            <div className="upload__image-wrapper relative ">
                                                <div class="mt-1 flex justify-center mb-8 items-center px-6 pt-5 pb-6 border-2 md:w-[18vw] w-[90vw] h-[180px] md:h-[200px]  border-dashed rounded-md">
                                                    <div class="space-y-1 text-center">
                                                        <div class="flex text-sm text-gray-600">
                                                            <label
                                                                onClick={onImageUpload}
                                                                for="file-upload2"
                                                                class="relative cursor-pointer rounded-md font-bold text-white bg-black p-2 bg-opacity-80 hover:text-[brown] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                            >
                                                                <svg
                                                                    class="mx-auto h-8 w-8"
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    viewBox="0 0 48 48"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path
                                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                        stroke-width="2"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                    />
                                                                </svg>
                                                                <span>Update Thumbnail</span>
                                                                <input
                                                                    style={{
                                                                        backgroundColor: " #919cb1",
                                                                        border: "#6b7280",
                                                                    }}
                                                                    class="sr-only"
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                {imageList?.map((image, index) => (
                                                    <div
                                                        style={{
                                                            zIndex: "1",
                                                            backgroundColor: "black",
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundAttachment: "",
                                                            backgroundImage: `url(${image?.data_url})`,
                                                        }}
                                                        class="z-10 bg-cover border-slate-600 border  md:w-[18vw] w-[90vw] h-[180px] md:h-[205px]  md:mx-auto absolute top-[-2%] left-[0%]  shadow overflow-hidden rounded-lg"
                                                    >
                                                        <div class="px-4 py-5 sm:px-6  ">
                                                            <p
                                                                title="Change thumbnail"
                                                                onClick={onImageUpload}
                                                                className="absolute top-[2%] right-[1%] md:top-[0%] md:right-[1%]  btn btn-xs my-3 "
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="h-6 w-6"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                                                    />
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                </svg>
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                                <div className="mb-7 md:ml-5 relativ">


                                    <div className="VideoInput relative">
                                        <input
                                            id="file-upload"
                                            className="VideoInput_input hidden"
                                            type="file"
                                            onChange={handleFileChange}
                                        />

                                        <div class="flex justify-center  items-center  border-2 px-6 pt-5 pb-6 md:w-[18vw] w-[90vw] h-[270px]  md:h-[200px] order-2 border-dashed rounded-md">
                                            {
                                                <div class="space-y-1 text-center z-10">
                                                    <div class="flex text-sm text-gray-600">
                                                        <label
                                                            for="file-upload"
                                                            class="relative cursor-pointer rounded-md font-bold text-white bg-black p-2 bg-opacity-80 hover:text-[brown] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                        >
                                                            <svg
                                                                onChange={handleFileChange}
                                                                class="mx-auto h-8 w-8"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                viewBox="0 0 48 48"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                    stroke-width="2"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                            </svg>
                                                            <span>Update Video</span>
                                                            <input
                                                                style={{
                                                                    backgroundColor: " #919cb1",
                                                                    border: "#6b7280",
                                                                }}
                                                                class="sr-only"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            {source && (
                                                <div
                                                    style={{ zIndex: "10" }}
                                                    className="absolute md:top-[-30%] top-[0] z-10"
                                                >
                                                    <video
                                                        className=" rounded cursor-pointer md:w-[30vw] w-[90vw] h-[270px] md:h-[270px] "
                                                        controls
                                                        controlsList="nodownload"
                                                    >
                                                        <source src={source} />
                                                    </video>
                                                </div>
                                            )}
                                            {
                                                <div
                                                    style={{ zIndex: "2" }}
                                                    className="absolute md:top-[-30%] top-[0] z-2"
                                                >
                                                    <video
                                                        className=" rounded cursor-pointer md:w-[30vw] w-[90vw] h-[270px] md:h-[270px] "
                                                        controls
                                                        controlsList="nodownload"
                                                    >
                                                        <source
                                                            src={
                                                                movie?.videos?.length && movie?.videos[0]?.url
                                                            }
                                                        />
                                                    </video>
                                                </div>
                                            }
                                            
                                        </div>
                                             {progress > 0 && (
                    <div>
                      <div className="flex justify-end items-center ">
                        <progress
                          class="progress progress-error mr-2"
                          value={progress}
                          max="100"
                        ></progress>
                      </div>
                      <label>{progress}% uploaded</label>
                    </div>
                  )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-control w-full max-w-xs text-white mt-10 ">
                            <p className="m-2">Update Category</p>
                            {selectedCate ? (
                                <select
                                    onChange={onChangeCategory}
                                    className="select select-bordered bg-slate-600"
                                >
                                    <option selected key={0}>
                                        {selectedCateName}
                                    </option>
                                    {category?.categories?.length > 0 &&
                                        category?.categories?.map((item) => {
                                            return (
                                                <option key={item?._id} value={item?._id}>
                                                    {item?.categoryName}
                                                </option>
                                            );
                                        })}
                                </select>
                            ) : (
                                <select
                                    onChange={onChangeCategory}
                                    className="select select-bordered bg-slate-600"
                                >
                                    <option
                                        selected
                                        key={movie?.categoryName || "movie_category_key"}
                                    >
                                        {movie?.categoryName}
                                    </option>
                                    {category?.categories?.length > 0 &&
                                        category?.categories?.map((item) => {
                                            return (
                                                <option key={item?._id} value={item?._id}>
                                                    {item?.categoryName}
                                                </option>
                                            );
                                        })}
                                </select>
                            )}
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex justify-between">
                                <h1 className="text-[brown] font-semibold"></h1>

                                <button type="submit" className=" btn bg-[brown] btn-xs my-5">
                                    Update below fields
                                </button>
                            </div>
                            <div>
                                <div className="">
                                    <div>
                                        <div>
                                            <textarea
                                                style={{ fontWeight: "bolder", fontSize: "20px" }}
                                                placeholder="Title"
                                                defaultValue={movie?.title}
                                                className="shadow-sm bg-[#181818] px-2 p-2 border-b-2 text-2xl font-blod focus:outline-none  block w-full sm:text-md"
                                                name=""
                                                id=""
                                                cols="30"
                                                rows="1"
                                                {...register("title", {
                                                    required: {
                                                        value: true,
                                                        message: "Title is required",
                                                    },
                                                })}
                                            ></textarea>
                                            <label className="label">
                                                {errors?.title?.type === "required" && (
                                                    <span className="label-text-alt text-[#e87c03]">
                                                        {errors.title.message}
                                                    </span>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grow-wrap  md:mr-5">
                                        <div className="form-control w-full max-w-xs text-white  ">
                                            <label class="label">
                                                <span class="label-text text-white">
                                                    Pick the genre
                                                </span>
                                            </label>
                                            {movie?.genre == "movie" ? (
                                                <select
                                                    onChange={(e) => {
                                                        setSelectedGenre(e.target.value);
                                                    }}
                                                    className="select select-bordered bg-slate-600"
                                                >
                                                    <option>movie</option>
                                                    <option>anime</option>
                                                </select>
                                            ) : (
                                                <select
                                                    onChange={(e) => {
                                                        setSelectedGenre(e.target.value);
                                                    }}
                                                    className="select select-bordered bg-slate-600"
                                                >
                                                    <option>anime</option>
                                                    <option>movie</option>
                                                </select>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="md:flex">


                                    {/* <div className="md:flex md:space-x-5 md:mt-[4%] ">
                    {active ? (
                      <div>
                        {movie?.isActive && (
                          <div className="form-control mt-10 ">
                            <label className="label cursor-pointer btn px-2">
                              <span className=" text-md">Active</span>
                              <input
                                onChange={onChangeActive}
                                type="checkbox"
                                checked
                                className="checkbox bg-slate-200 checkbox-error ml-5 "
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {
                          <div className="form-control mt-10 ">
                            {showActive.current ? (
                              <label className="label cursor-pointer btn px-2">
                                <span className=" text-md">Active</span>
                                <input
                                  onChange={onChangeActive}
                                  type="checkbox"
                                  checked
                                  className="checkbox bg-slate-200 checkbox-error ml-5 "
                                />
                              </label>
                            ) : (
                              <label className="label cursor-pointer btn px-2">
                                <span className=" text-md">Active</span>
                                <input
                                  onChange={onChangeActive}
                                  type="checkbox"
                                  className="checkbox bg-slate-200 checkbox-error ml-5 "
                                />
                              </label>
                            )}
                          </div>
                        }
                      </div>
                    )}
                  </div> */}
                                </div>

                                <div className="md:flex mt-10">
                                    <div className="grow-wrap md:mr-10 mt-10 md:mt-0 md:mb-20 ">
                                        <textarea
                                            style={{ fontWeight: "bold", fontSize: "15px" }}
                                            placeholder="Tags"
                                            defaultValue={movie?.tags}
                                            className="shadow-sm bg-[#181818] p-2  border-b-2 md:text-lg font-blod focus:outline-none  px-2 block w-full sm:text-md p-2"
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="1"
                                            {...register("tags")}
                                        ></textarea>
                                    </div>
                                    <div className="grow-wrap mt-10 md:mt-0 md:mb-20 ">
                                        <textarea
                                            style={{ fontWeight: "bold", fontSize: "15px" }}
                                            placeholder="IMDb Rating"
                                            className="shadow-sm bg-[#181818]  border-b-2 md:text-lg font-blod focus:outline-none  px-2 block w-full sm:text-md p-2"
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="1"
                                            {...register("imdbRating")}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="grow-wrap">
                                    <textarea
                                        style={{ fontWeight: "bold", fontSize: "15px" }}
                                        placeholder="Description..."
                                        defaultValue={movie?.description}
                                        id="description"
                                        name="description"
                                        rows="4"
                                        className=" shadow-sm bg-[#181818] border-b-2 focus:outline-none mt-12 pt-12 text-lg mt-1 block w-full  px-2 "
                                        {...register("description")}
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
