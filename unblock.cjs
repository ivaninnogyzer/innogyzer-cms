const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://postgres:wSqd0N1fWCD3Td1e@db.ravlftzusebfefwqsstg.supabase.co:5432/postgres',
});
client.connect()
  .then(() => {
    console.log('Connected to DB...');
    return client.query('UPDATE users SET login_attempts = 0, lock_until = NULL;');
  })
  .then(() => console.log('Successfully unblocked users!'))
  .catch(err => console.error('Error:', err))
  .finally(() => client.end());
