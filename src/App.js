import './App.css';
import { useState,useEffect} from 'react';
import axios from'axios';

function App() {
             
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const[salary,setSalary]=useState("");
  const [totalSalary, setTotalSalary] = useState(0);
  const [mylist,setMylist] =useState([])


  function changeDemo1(e) {
    setName(e.target.value);

  }
   
  function changeDemo2(e) {
    setPhone(e.target.value);
  }
  function changeDemo3(e) {
    setEmail(e.target.value);
  }
  function changeDemo4(e) {
    setAddress(e.target.value);
  }
  function changeDemo5(e) {
    setSalary(e.target.value);
  }

  useEffect(()=>{
    axios.get('http://localhost:4200/showperson')
    .then(response => {
      setMylist(response.data);
      console.log(response.data);
    
    })
    .catch(error => {
      console.log(error);
    });

  },[])


  
  const handleSubmit = () => {
   
   let formData = { "name":name,"phone":phone,"email":email,"address":address,"salary":salary}
   setTotalSalary((gross) => gross + parseInt(salary));
   alert("ok")
  axios.post("http://localhost:4200/person_create",formData).then(res => setMylist(res.data) );
    }

    function onDelete(e) {
      e.preventDefault();
      const name = e.target.name;
      console.log(name);
      let formData = {"name": name}
      axios.post("http://localhost:4200/pdelete",formData)
      .then(res=>setMylist(res.data))
       .catch(error => console.error('Error:',error));
      };
   

    function onEdit(e) {
      e.preventDefault();
      const name = e.target.name;
      console.log(name);

      let formData = {"name": name}
    
      axios.post("http://localhost:4200/editperson", formData)
        .then(res => {
          console.log(res)
          const personData = res.data[0]; // Assuming the data is an array with one person
    
          // Populate the form fields with the person's data
          setName(personData.name);
          setPhone(personData.phone);
          setEmail(personData.email);
          setAddress(personData.address);
          setSalary(personData.salary);
        })
        .catch(error => {
          console.error('Error fetching person data for editing:', error);
        });
    }
    function onUpdate() {
      // Assuming you have the person's updated information in your state
      const updatedData = {
        phone: phone,
        email: email,
        address: address,
        salary: salary
      };
  
      axios.post(`http://localhost:4200/updateperson/${name}`, updatedData)
        .then(res => {
          // Handle the response if needed
          console.log('Person data updated successfully');
        })
        .catch(error => {
          console.error('Error in onUpdate:', error);
        });
    }

  
  return (
   <div className='App'>
    <h1 className='h1'>FORM</h1>
    <label className='lab'>NAME:</label>
    <input className='input' type="text" autoComplete='off' value={name}     name="name" id="t1" onChange={changeDemo1} ></input><br></br>
  
    <label className='lab'>PHONE:</label>
    <input className='input' type="number" autoComplete='off' value={phone} name="phone" id="t2"  onChange={changeDemo2}></input><br></br>
   
    
    <label className='lab'>EMAIL:</label>
    <input className='input' type="email" autoComplete='off' value={email} name="email" id="t3"  onChange={changeDemo3}></input><br></br>
    
    <label className='lab'>ADDRESS:</label>
    <input className='input' type="text" autoComplete='off' value={address} name="address" id="t4"  onChange={changeDemo4}></input><br></br>

    <label className='lab'>salary:</label>
    <input className='input' type="text" autoComplete='off' value={salary} name="salary" id="t5"  onChange={changeDemo5}></input><br></br>
    
<input className='button' type="button"  onClick={handleSubmit} value="Submit"></input><br></br>
<button className='button' type="button" onClick={onUpdate}>
        Update
      </button>
<table className="table" border={2} cellPadding={10}>

        <tbody>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>salary</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
          
          {mylist.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.salary}</td>
              <td><button variant="danger"name={item.name}onClick={onDelete}>Delete</button></td>
              <td><button variant="danger" name={item.name} onClick={(e) => onEdit(e)}>Edit</button></td>
              </tr>


          ))}
          <tr><td colspan="7"> Total = {totalSalary}</td></tr>
          
        </tbody>
      </table>
   </div>
   );
          }
  
export default App;