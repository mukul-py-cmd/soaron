# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

Routes

/api/exercise/new-user [POST]
{
    userName:'mukul'
}

/api/exercise/users [GET]

/api/exercise/add   [POST]
{
    "userId":"8",
    "description":"abcd",
    "duration":45,
    "date":"2020-03-03" //OPTIONAL
}

/api/exercise/log [GET]
queryparams:{
    userId:4,
    from:"2020-03-03",  //OPTIONAL
    to:"2020-03-03",  //OPTIONAL
    limit:10  //OPTIONAL
}

/api/exercise/logcount   [GET]
queryparams:{
    userId:4
}