import Cocolis from './src/index'

const CocolisClient = new Cocolis({ live: false }) 
CocolisClient.sign_in({app_id: 'e0611906', password: 'sebfie'}).then(r => {
  console.log(r)
  const canMatchParams = {
    from: {
      postal_code: "13001"
    },
    to: {
      postal_code: "31000"
    },
    volume: 500,
    content_value: 120000
  };
  
  CocolisClient.can_match(canMatchParams).then(r => {
    console.log(r.data);
  })
});
