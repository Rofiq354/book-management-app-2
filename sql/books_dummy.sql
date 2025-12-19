INSERT INTO books (
  title,
  isbn,
  author,
  publisher,
  publication_year,
  category_id,
  total_stock,
  available_stock,
  created_at,
  updated_at
)
VALUES
  (
    'Clean Code: A Handbook of Agile Software Craftsmanship',
    '978-0132350884',
    'Robert C. Martin',
    'Prentice Hall',
    2008,
    1,
    6,
    6,
    NOW(),
    NOW()
  ),
  (
    'The Pragmatic Programmer',
    '978-0201616224',
    'Andrew Hunt & David Thomas',
    'Addison-Wesley',
    1999,
    1,
    5,
    5,
    NOW(),
    NOW()
  ),
  (
    'Atomic Habits',
    '978-0735211292',
    'James Clear',
    'Avery',
    2018,
    3,
    7,
    7,
    NOW(),
    NOW()
  ),
  (
    'Rich Dad Poor Dad',
    '978-1612680194',
    'Robert T. Kiyosaki',
    'Plata Publishing',
    1997,
    2,
    4,
    4,
    NOW(),
    NOW()
  ),
  (
    'The 7 Habits of Highly Effective People',
    '978-0743269513',
    'Stephen R. Covey',
    'Free Press',
    1989,
    3,
    3,
    3,
    NOW(),
    NOW()
  );
