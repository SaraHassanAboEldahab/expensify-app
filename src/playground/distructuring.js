//object distructuring
const info={
    name:'sara',
    age:25,
    faculty:'engineering',
    location:{
      city:'Gyza',
      
    }
  }
  const {name,age,faculty}=info;
  const {city,temp=30}=info.location;
  console.log(`I'm ${name} and ${age} years old ,I study at ${faculty} ,I lived in ${city} where temperature is ${temp}`);
  
  //array distructuring 
  const item =['coffee (hot)','$2.00','$2.50','$2.75'];
  const[cof, ,price]=item;
  console.log(`A medium ${cof} costs ${price}`);


  //we can make distruction also in function
const sad = ({ a, b }, c) => {
    return a + b + c;
  }
  console.log(sad({ a: 12, b: 12 }, 100));