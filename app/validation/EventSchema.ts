import vine from "@vinejs/vine"
export const EventFormSchema=vine.object({
    name:vine.string().minLength(5),
    description:vine.string().minLength(10),
    location:vine.string(),
   date:vine.string(),
   
imageUrl:vine.string()

})