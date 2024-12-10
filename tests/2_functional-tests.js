const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    const formdata_body = {            
        issue_title: 'test',
        issue_text: 'sue txt',
        created_by: 'sol 34',
        assigned_to: 'me ku',
        status_text:'statuss' }

      const formdata_body_incomplete = {            
        issue_title: 'test',
        created_by: 'sol 34',
        assigned_to: 'me ku',
        status_text:'statuss' }
       
        test('Create an issue with every field',(done)=>{
    chai
        .request(server)
        .keepOpen()
        .post('/api/issues/apitest')
        .type('form')
        .send(formdata_body)
        .end((err,res)=>{

        assert.equal(res.status,200)
        assert.deepInclude(res.body,{
            ...formdata_body,
            "open": true,
        })
        
        formdata_body._id = res.body._id
         done()   
        })

  })
  test('return error if all required fields are not sent',(done)=>{
    chai
        .request(server)
        .keepOpen()
        .post('/api/issues/apitest')
        .type('form')
        .send(formdata_body_incomplete)
        .end((err,res)=>{

        assert.equal(res.status,200)
        assert.deepEqual(res.body,{ error: 'required field(s) missing' })
         done()   
        })

  })
  test('send get req to get array of issues',(done)=>{
    chai
        .request(server)
        .keepOpen()
        .get('/api/issues/apitest')
        .end((err,res)=>{

        assert.equal(res.status,200)
    
        assert.isArray(res.body,'must be an array')
  
         done()   
        })

  })
  test('send put req to update record',(done)=>{

    chai
        .request(server)
        .keepOpen()
        .put('/api/issues/apitest')
        .send({...formdata_body,issue_text:'updated guy'})
        .end((err,res)=>{

        assert.equal(res.status,200)
    console.log({formdata_body})
        assert.deepEqual(res.body,  {  result: 'successfully updated', '_id':formdata_body._id })

      
  
         done()   
        })

  })

   test('send put req without _id',(done)=>{
 
    chai
        .request(server)
        .keepOpen()
        .put('/api/issues/apitest')
        .send({issue_text:'updated guy'})
        .end((err,res)=>{

        assert.equal(res.status,200)
    
        assert.deepEqual(res.body,  { error: 'missing _id' })

         done()   
        })

  }) 

  test('send delete req without _id',(done)=>{

    chai
        .request(server)
        .keepOpen()
        .delete('/api/issues/apitest')
        .send({issue_text:'updated guy'})
        .end((err,res)=>{

        assert.equal(res.status,200)
    
        assert.deepEqual(res.body,  { error: 'missing _id' })
  
         done()   
        })

  }) 
  test('send delete req with _id',(done)=>{

    chai
        .request(server)
        .keepOpen()
        .delete('/api/issues/apitest')
        .send({_id:formdata_body._id})
        .end((err,res)=>{

        assert.equal(res.status,200)
    
        assert.deepEqual(res.body,  {  result: 'successfully deleted', '_id': formdata_body._id })
  
         done()   
        })

  }) 

});
