import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

// Replace with your Supabase URL and Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  // Replace with your desired user details
  const email = 'test@example.com';
  const password = 'P@$$wOrd';
  const name = 'Test User';

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name: name,
          email: email,
          hashedPassword: hashedPassword,
        },
      ]);

    if (error) {
      console.error('Error seeding database:', error);
    } else {
      console.log('Seeded user:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

seedDatabase();
