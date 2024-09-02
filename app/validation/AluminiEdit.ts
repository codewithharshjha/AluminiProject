import vine from "@vinejs/vine"
export const CreateAluminiSchema=vine.object({
    email:vine.string().email(),
    name:vine.string().optional(),
    lastname:vine.string().optional(),
    bio:vine.string().optional(),
   profession:vine.string().optional(),
    imageUrl:vine.string().optional(),

})