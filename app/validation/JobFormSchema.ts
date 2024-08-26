import vine from "@vinejs/vine"
export const JobFormSchema=vine.object({
    jobtitle:vine.string().minLength(5),
    jobdescription:vine.string().minLength(10).maxLength(500),
    joblocation:vine.string(),
    package:vine.string(),
    companyname:vine.string(),
    jobrole:vine.string()


})