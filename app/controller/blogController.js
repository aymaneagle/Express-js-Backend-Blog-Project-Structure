import path from 'path';

export const createBlog = async (req, res) => {
    res.json({message:"Blog created successfully"});
}

export const readBlog = async (req, res) => {
    res.json({message:"Blog reading successfully"});
}

export const updateBlog = async (req, res) => {
    res.json({message:"Blog updated successfully"});
}

export const deleteBlog = async (req, res) => {
    res.json({message:"Blog deleted successfully"});
}