import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join } from "path";

@Controller("upload")
export class UploadController {
  @Post("single")
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), "uploads"),
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + "-" + file.originalname);
        }
      }),
    }),
  )
  singleFileUpload(@UploadedFile() file: Express.Multer.File) {
    
    return {
      message: "succesfully upload",
      filePath: "http://localhost:4001/uploads/" + file.filename
    }
  }



    @Post("multiple")
  @UseInterceptors(
    FilesInterceptor('files', 10 ,{
      storage: diskStorage({
        destination: join(process.cwd(), "uploads"),
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + "-" + file.originalname);
        }
      }),
    }),
  )
  multipleFileUpload(@UploadedFiles() files: Express.Multer.File[]) {
    
    return {
      message: "succesfully upload",
      filePath: files.map((file)=> "http://localhost: 4001/uploads"+ file.filename)
    }
  }
}






