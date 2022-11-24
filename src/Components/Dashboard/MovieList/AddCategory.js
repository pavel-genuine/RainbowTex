import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { categoryCreate } from '../../../redux/features/categorySlice';

const AddCategory = ({handleNewCate}) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { category} = useSelector(state => state?.categoryCreate)

    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        const submit =  dispatch(categoryCreate(data))
        console.log(submit, 'submit');
        handleNewCate(data)
        return submit;
    }

    return (
        <div> <label for="my-modal-4" class="btn modal-button btn-sm">Add Category</label>


            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
            <label for="my-modal-4" class="modal cursor-pointer">
                <label class="modal-box relative" for="">
                    <div >
                        <label for="review" class="block text-lg font-semibold text-black  "> Add Category</label>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input style={{ backgroundColor: '#e8e7e9', }}
                                id="category" name="category"
                                className="shadow-sm  mt-1 outline-0 block w-full sm:text-sm border text-black rounded-md p-2"
                                {...register("categoryName")}>
                            </input>
                            <input className='btn bg-black w-full max-w-xs text-white my-3' type="submit" value="Add" />

                        </form>
                    </div>
                </label>
            </label></div>
    )
}

export default AddCategory