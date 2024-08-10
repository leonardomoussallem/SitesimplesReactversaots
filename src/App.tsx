import { Header } from './components/Header';
import { Post } from './components/Post';
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';

import './global.css';

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'http://github.com/leonardomoussallem.png',
      name: 'Leonardo Moussallem',
      role: 'CTO Leozimsuplementos',
    },
    content: [
      { type: 'paragraph', content: 'Fala galerinhaa',},
      { type: 'paragraph', content: 'acabei de subir um novo projeto no github corre la',},
      { type: 'link', content: 'github/leozimsuplementos.com',},
    ],
    published: new Date('2024-08-07 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'http://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'CO-LIDER Leozimsuplementos',
    },
    content: [
      { type: 'paragraph', content: 'Fala galerinhaa',},
      { type: 'paragraph', content: 'acabei de subir um novo projeto no github corre la',},
      { type: 'link', content: 'github/leozimsuplementos.com',},
    ],
    published: new Date('2024-08-01 20:00:00'),
  },
];

export function App() {
  return (
    <div>
      <Header />

    <div className={styles.wrapper}>
      <Sidebar />
      <main>
      {posts.map(post => {
        return (
        <Post
          key={post.id}
          author={post.author}
          content={post.content}
          publishedAt={post.published}
        />
        )
      })}
      </main>
      </div>
    </div>
  )
}

export default App
