type JobForm={
    jobtitle:string;
    jobdescription:string;
    joblocation:string;
    package:string;
    jobrole:string;
    companyname:string;
    


}
type JobFormwithId={
    id:number;
    jobtitle:string;
    jobdescription:string;
    joblocation:string;
    package:string;
    jobrole:string;
    companyname:string;
    


}
type RegisterAlumini={
    name:string;
    email:string;
    password:string;
    batch:string;
    phone:string;
}


type RegisterEvent={
name:string;
description:string;
imageUrl:string;
location:string;
date:string;

}
type RegisterEventBackend={
    name:string;
    description:string;
    imageUrl:string;
    location:string;
    date:string;
    id:number; 
}
type AdminInfo={
    name:string;
    email:string;
    password:string;
    phone:string;
}
type AluminiProfile={
    name:string;
    lastname:string;
    bio:string;
    profession:string;
    imageUrl:string;
    email:string;
}
type AluminiProfileBackend={
    name:string;
    lastname:string;
    bio:string;
    profession:string;
    imageUrl:string;
    email:string;
    id:number;
}