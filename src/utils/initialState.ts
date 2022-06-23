 type SubGenre = {
  title:string,
  author:string,
  isbn:string,
  publisher:string,
  date:Date,
  noOfPages:number,
  format:string,
  edition:string,
  editionLanguage:string,
  desc:string
}

export const initialSubGenreProps:SubGenre = {
  title:"",
  author:"",
  isbn:"",
  publisher:"",
  date:new Date(),
  noOfPages:0,
  format:"",
  edition:"",
  editionLanguage:"",
  desc:""
}