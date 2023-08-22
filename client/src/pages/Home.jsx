import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://intellibot-vl66.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-white text-[32px]">IntelliBot(BETA). An AI image generation tool.</h1>
        <p className="mt-2 text-[#63f7ff] text-[14px] max-w-[500px]">Built for everyone to create AI images without any knowledge of Artificial Intelligence. Please browse images already created below or press the "Create" button to start creating images of your own.</p>
        <button className='mt-10 mb-10'><Link to="/create-post" className="font-inter font-medium bg-[#63f7ff] text-black px-4 py-2 rounded-md">Create</Link></button>
      </div>
      <div>
        <h2 className="font-bold mt-10 text-white text-[26px]">The Community Showcase</h2>
        <p className="mt-2 text-[#63f7ff] text-[14px] max-w-[500px]">Welcome to the top posts today!</p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#63f7ff] text-xl mb-3">
                Showing Results for <span className="text-[#63f7ff]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;