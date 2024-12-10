'use strict';

module.exports = function (app,collections) {

  app.route('/api/issues/:project')
  
    .get(async  function (req, res){
    
      let project = req.params.project;
      let filter = {}
      let {open,assigned_to,status_text,issue_text,issue_title,created_by,_id} = req.query
      if (Boolean(open)) filter.open = open;
      if (assigned_to) filter.assigned_to = assigned_to;
      if (status_text) filter.status_text = status_text;
      if (issue_title) filter.issue_title = issue_title;
      if (issue_text) filter.issue_text = issue_text;
      if (created_by) filter.created_by = created_by;
      if (_id) filter._id = _id;
      let project_record = await collections.Issue.find({...filter})
      if(!project_record) return res.send('not found')
        return res.send(project_record)


    })
    
    .post(async function (req, res){
      let project = req.params.project;

     const {
        assigned_to= "",
        status_text= "",
        issue_title,
        issue_text,
        created_by= ""
    } = req.body
    if(!issue_text || !issue_title) return res.send({ error: 'required field(s) missing' })
    let create_project_record = new collections.Issue( {
      assigned_to,
      status_text,
      issue_title,
      issue_text,
      created_by
  })//.findOne({project,...filter})

let project_record=  await create_project_record.save()
return res.send(project_record)

      
    })
    
    .put(async function (req, res){
      try{
        let project = req.params.project;
      let {_id}= req.body
      if(!_id)return res.send({ error: 'missing _id' })
      const expeced_fields =     [            
        'issue_title',
        'issue_text',
        'created_by',
        'assigned_to',
        'status_text',
      '_id' ]

        let proposed_fields = Object.keys(req.body)
        if(proposed_fields.length<2) return res.send({ error: 'no update field(s) sent', '_id': _id })
      let updated =await collections.Issue.updateOne({_id},{...req.body}) 
       return res.send( {  result: 'successfully updated', '_id': _id })
    }catch(err){
      return res.send({ error: 'could not update', '_id': _id })
    }

    })
    
    .delete(async function (req, res){
      try{
     
      let {_id}= req.body
      if(!_id)return res.send({ error: 'missing _id' })
 
        let deleted =await collections.Issue.deleteOne({_id},{...req.body}) 
        return res.send( {  result: 'successfully deleted', '_id': _id })
    }catch(err){
      return res.send({ error: 'could not delete', '_id': _id })
    }

    })

    
};
