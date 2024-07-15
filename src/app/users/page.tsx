import React from 'react';

const users = [
  {
    id: 1,
    username: 'Samet',
    avatar: 'https://images-ext-1.discordapp.net/external/ywPKMuPckvsPMFmZlT-4rF2kfmDHpKh9ck-iQtP0wv0/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1120483504535392327/a_5cfa092c536aae1654851f3378880fdd.gif?width=300&height=300',
    banner: 'https://via.placeholder.com/600x200',
    bio: 'Hello, I\'m Samet. I have been actively involved in the software world for 2-3 years. I specialize in C# and JavaScript and have developed various projects.',
    visits: 112,
  },
  {
    id: 2,
    username: 'Eren',
    avatar: 'https://images-ext-1.discordapp.net/external/GZjLkASr8dsEj87O1HRbP360Hd344HohVuLwMHwAgyw/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/1033759126901227522/a_a7cc564742ecae51779108d70164a52e.gif',
    banner: 'https://via.placeholder.com/600x200',
    bio: 'Hello, I\'m Eren. I am constantly developing myself in various languages and producing new projects.',
    visits: 26,
  }
];

export default function Page() {
  return (
    <div className="min-h-screen text-white">
      <header className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Tüm Kullanıcılar</h1>
        <p className="mb-8">Profilleri göz atın ve keşfedin</p>
        <input 
          type="text" 
          placeholder="Kullanıcıları ara..." 
          className="w-full max-w-md p-2 rounded-md bg-gray-800 border border-gray-700"
        />
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map(user => (
            <div key={user.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img src={user.banner} alt={`${user.username}'s banner`} className="w-full h-32 object-cover" />
              <div className="p-4">
                <div className="flex items-center">
                  <img src={user.avatar} alt={user.username} className="w-14 h-14 rounded-full mr-3" />
                  <div>
                    <h2 className="text-xl font-semibold">{user.username}</h2>
                    <p className="text-gray-400">@{user.username.toLowerCase()}</p>
                  </div>
                </div>
                <p className="mt-3">{user.bio}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-400"><i className="fas fa-eye"></i> {user.visits}</span>
                  <a 
                    href={`/profile/${user.id}`} 
                    className="bg-purple-600 text-white py-1 px-3 rounded-md hover:bg-purple-700 transition"
                  >
                    Ziyaret Et
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
