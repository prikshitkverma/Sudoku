const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895",
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841",
];
let convertedMatrix=[];
let ans;
let duplicateCol=[];
let duplicateRow=[];
let duplicateBox=[];

const loadFunc = () => {
  document.querySelector(".alertpop").style.display="none";
      for (var i = 0; i < 81; i++) {
    var a = document.getElementById(i);
    if (i <= 8) {
      a.parentNode.classList.add("top-dark");
    }
    if ((i + 1) % 3 == 0) {
      a.parentNode.classList.add("right-dark");
    }
    if (i > 71 || (i > 17 && i < 27) || (i > 44 && i < 54)) {
      a.parentNode.classList.add("bottom-dark");
    }
    if (i % 9 == 0) {
      a.parentNode.classList.add("left-dark");
    }
  }
  generateMaze(easy);
  // document.querySelectorAll("input").forEach((val)=>{
  //   val.addEventListener("click")
  // })
};
const generateMaze = (board) => {
  document.querySelectorAll("input").forEach((val) => {
    val.disabled = false;
    val.value = "";
    val.parentNode.classList.remove("inpDisabled");
    val.classList.remove("filledColor");
    val.classList.remove("duplicate")
  });
  convertedMatrix=[];
  let arr=[];
  for (let i = 0; i < 81; i++) {
    let a = document.getElementById(i);
    let col=i%9;      
    if (board[0].charAt(i) !== "-") {
      a.value = board[0].charAt(i);
      a.parentNode.classList.add("inpDisabled");
      a.disabled = true;
      //generateArray(i,a.value);
      arr[col]=a.value;     
    }
    else{
        arr[col]=null;
    }
    if((i+1)%9===0){
        convertedMatrix.push(arr);
        arr=[];
    }
  }
  ans=board[1];
  document.querySelectorAll("input").forEach((val)=>{
    val.addEventListener("keydown",()=>{
      val.classList.add("filledColor");
    })
  }) 
  duplicateBox=[];
  duplicateCol=[];
  duplicateRow=[];
  console.log(convertedMatrix)
};
const easyMaze = () => {
  let board = easy;
  generateMaze(board);
};
const mediumMaze = () => {
  let board = medium;
  generateMaze(board);
};
const hardMaze = () => {
  let board = hard;
  generateMaze(board);
};




const doCheck = (object) => {
  if(object.value.length > 1 && object.value.charAt(object.value.length-1)==0){
    object.value = object.value.slice(
      0,
      1
      );
    }
    else if(object.value==0){
      object.value="";
    }
  else if (object.value.length > 1)
    object.value = object.value.slice(
      object.value.length - 1,
      object.value.length
    );
    validate(object);
};

const validate=(object)=>{

    validateRow(object);
    validateCol(object);
    validateBox(object);
    for(let i=0;i<=9;i++){
      if(Array.isArray(duplicateRow[i])){
        for(let j=0;j<=9;j++){
          if(Array.isArray(duplicateRow[i][j])){
            duplicateRow[i][j].map((val)=>{
              document.getElementById(val).classList.add("duplicate")
            }) 
          }
        }
      }
      if(Array.isArray(duplicateCol[i])){
        for(let j=0;j<=9;j++){
          if(Array.isArray(duplicateCol[i][j])){
            duplicateCol[i][j].map((val)=>{
              document.getElementById(val).classList.add("duplicate")
            }) 
          }
        }
      }
      if(Array.isArray(duplicateBox[i])){
        for(let j=0;j<=9;j++){
          if(Array.isArray(duplicateBox[i][j])){
            duplicateBox[i][j].map((val)=>{
              document.getElementById(val).classList.add("duplicate")
            }) 
          }
        }
      }
    }
}
const validateRow=({id,value})=>{
    let row=Math.floor(id/9);
    let col=id%9;
    convertedMatrix[row][col]=value;
      removeCheck(duplicateRow,id,row)
    let duplicate=[];
    let count=0;
      convertedMatrix[row].filter((val,index)=>{
          if(val===value){
            let id=(row)*9+index;
              duplicate.push(id);
              count+=1;
          }
      });
    if(value!==""&&count>1){
      if(duplicateRow[value]){
        duplicateRow[value][row]=duplicate;
      }else{
        duplicateRow[value]=[];
        duplicateRow[value][row]=duplicate;
      }
      // duplicateRow[value][row].map((val)=>{
      //   document.getElementById(val).classList.add("duplicate")
      // })
    }
    console.log(duplicateRow)
}
const validateCol=({id,value})=>{
    let row=Math.floor(id/9);
    let col=id%9;
      removeCheck(duplicateCol,id,col)
    let duplicate=[];
    let count=0;
    for(let i=0;i<9;i++){
        if(convertedMatrix[i][col]===value){
            let id=(i)*9+col;
            duplicate.push(id);
            count+=1;
        }
    }
    if(value!==""&&count>1){
      if(duplicateCol[value]){
        duplicateCol[value][col]=duplicate;
      }
      else{
        duplicateCol[value]=[];
        duplicateCol[value][col]=duplicate;
      }
      // duplicateCol[value][col].map((val)=>{
      //   document.getElementById(val).classList.add("duplicate");
      // })
    }
    console.log(duplicateCol);
}
const validateBox=({id,value})=>{
  let row=Math.floor(id/9);
  let col=id%9;
  let duplicate=[];
  let count=0;
  let [sRow,eRow]=getBox(row);
  let [sCol,eCol]=getBox(col);
  let boxId=getId(sRow,sCol);
    removeCheck(duplicateBox,id,boxId)
  for(let i=sRow;i<=eRow;i++){
    for(let j=sCol;j<=eCol;j++){
      if(convertedMatrix[i][j]===value){
            let id=(i)*9+j;
            duplicate.push(id);
            count+=1;
      }
    }
  }
  if(value!==""&&count>1){
    if(duplicateBox[value]){
      duplicateBox[value][boxId]=duplicate;
    }
    else{
      duplicateBox[value]=[];
      duplicateBox[value][boxId]=duplicate;
    }
  }
console.log(duplicateBox);
}
const getId=(row,col)=>{
  if(row==0&&col==0){
    return 1;
  }
  else if(row==0&&col==3){
    return 2;
  }
  else if(row==0&&col==6){
    return 3;
  }else if(row==3&&col==0){
    return 4;
  }else if(row==3&&col==3){
    return 5;
  }else if(row==3&&col==6){
    return 6;
  }else if(row==6&&col==0){
    return 7;
  }else if(row==6&&col==3){
    return 8;
  }else if(row==6&&col==6){
    return 9;
  }
}
const getBox=(rowcol)=>{
  let Arr=[];
  if(rowcol<3){
    return [0,2];
  }
  else if(rowcol<6){
    return [3,5];
  }
  else if(rowcol<9){
    return [6,8];
  }
}
const removeCheck=(mainArr,id,rowcol)=>{
  let flag=0;
  for(let i=0;i<=9;i++){
    if(Array.isArray(mainArr[i])){
      if(mainArr[i][rowcol]!=null){

        let temp=[];
          mainArr[i][rowcol].map((val)=>{
              if(mainArr[i][rowcol].length<=2 && val==id ){
                  flag=1;
              }
              else if(val==id){
                temp=mainArr[i][rowcol].filter((newval)=>newval!=val)
                flag=2;
                document.getElementById(val).classList.remove("duplicate")
              }
          })
          if(flag===1){
            mainArr[i][rowcol].map((val)=>{
              document.getElementById(val).classList.remove("duplicate")
            })
              mainArr[i][rowcol]=null;
              flag=0;
          }
          else if(flag===2){
            mainArr[i][rowcol]=temp;
          }
      }
    }
}

}
const ansCheck=()=>{
  let finalans="";
  let flag=0;
  for(let i=0;i<9;i++){
    finalans+=convertedMatrix[i].toString();
  }
  for(let i=0;i<81;i++){
    if(finalans.charAt(i)==ans.charAt(i)&&i==80){
      flag=1;
    }
    else{
      break;
    }
  }
  if(flag==1){
    let p=document.querySelector('.alertpop');
    p.style.display="block";
    p.lastChild.addEventListener("click",()=>loadFunc());
  }
  else{
    let p=document.querySelector('.alertpop');
    //p.textContent="TRY AGAIN";
    p.style.background="red";
    p.firstChild.innerText="Try Again";
    p.lastChild.addEventListener("click",()=>{p.style.display="none";});
    p.style.display="block";
  }
}