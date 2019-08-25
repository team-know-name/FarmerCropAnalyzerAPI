const express = require('express')
const cors = require('cors');
const bodyParser=require('body-parser')
const formidable=require('formidable')
const fs=require('fs');

const { PythonShell } = require("python-shell");
const app=express();

// Middleware for POST request data 
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/',(req,res)=>{
  res.send("Working")
})


app.post('/fileupload',(req,res)=>{
    console.log('Post image');
    let form=formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
      let oldPath=files.filetoupload.path;
      console.log(files.filetoupload.name);
      let newPath=__dirname+'/public/'+files.filetoupload.name;
      console.log(newPath);
      fs.rename(oldPath,newPath,(err)=>{
        if(err){
          throw err;
        }
        let options={
          args:[newPath]
        }
        PythonShell.run("label_image.py",options,(err,result)=>{
          if(err){
            throw err;
          }
          let category=result;
          console.log(category)
          op={}; // output json object
          if(category=="Tomato mosaic virus"){
            op.Symptons={"1":"Light and dark green mottled areas will appear on the leaves of tomato plants infected with this virus.",
                        "2":"Other symptoms include stunted growth, fruit deformities, and a reduction in the amount of fruit produced."
                        },
            op.Treatment={"1":"There are no cures for viral diseases such as mosaic once a plant is infected.",
                            "2":"Fungicides will NOT treat this viral disease.",                
                            "3":"Frequently wash your hands and disinfect garden tools, stakes, ties, pots, greenhouse benches, etc. (one part bleach to 4 parts water) to reduce the risk of contamination.",
                            "4":"Avoid using tobacco around susceptible plants. Cigarettes and other tobacco products may be infected and can spread the virus."
                         },
            op.Recommended_Products={
                    "Harvest-Guard":"https://www.planetnatural.com/product/floating-row-cover/",
                    "AllDown":"https://www.planetnatural.com/product/vinegar-weed-killer/"
            }
          }
    if(category=="Apple Scab"){
            op.Symptons={"1":"Dull black or grey-brown lesions on the surface of tree leaves,[1] buds or fruits. "
                        },
            op.Treatment={"1":"Removing leaf litter and trimmings containing infected tissue from the orchard and incinerating them.",
                            "2":"Benzimidazole fungicides",                
                            "3":"Sterol inhibitors such as Nova 40, and strobilurins such as Sovran "                         
                          }
            op.Recommended_Products={
                    "Harvest-Guard":"https://www.planetnatural.com/product/floating-row-cover/",
                    "AllDown":"https://www.planetnatural.com/product/vinegar-weed-killer/"
            }              
          }
    if(category=="Potato Early Blight"){
            op.Symptons={"1":"The lesions are dark brown and appear leathery with faint, concentric rings giving a target-spot effect.",
                        "2":"At first the spots are small (1 /8 inches in diameter) and oval or angular in shape, but later the spots can enlarge to about 1/2 inches"
                        },
            op.Treatment={"1":"Plant only diseasefree, certified seed.",
                            "2":"Follow a complete and regular foliar fungicide spray program.",                
                            "3":"Allow tubers to mature before digging, dig when vines are dry, not wet, and avoid excessive wounding of potatoes during harvesting and handling"                         
                          }
        op.Recommended_Products={
            "Harvest-Guard":"https://www.planetnatural.com/product/floating-row-cover/",
            "AllDown":"https://www.planetnatural.com/product/vinegar-weed-killer/"
                    }              
          }


 if(category=="Grape Black Rot"){
            op.Symptons={"1":"Relatively small, brown circular lesions develop on infected leaves and within a few days tiny black spherical fruiting bodies (pycnidia) protrude from them",
                        "2":"Elongated black lesions on the petiole may eventually girdle these organs, causing the affected leaves to wilt"
                        },
            op.Treatment={"1":"Management of the fields and sanitation methods to optimally grow grape crops.",
                            "2":"Fungicides",                	
                            "3":"Pristine 38WDG",
                            "4":"Sovran 50WG"
                         }
            op.Recommended_Products={
                    "Harvest-Guard":"https://www.planetnatural.com/product/floating-row-cover/",
                    "AllDown":"https://www.planetnatural.com/product/vinegar-weed-killer/"
            }
                        }
          console.log(op);
          res.send(op);
        })
      })
    })
})

app.listen(process.env.PORT || 4444,function(){
    console.log('Server started');
})





