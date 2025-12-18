import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAllJobs, setSearchedQuery } from '@/redux/jobSlice'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'

const Home = () => {
  useGetAllJobs();
  const { user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(""));
    const fetchAllJobs = async () => {
      try {
          const res = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
          if(res.data.success){
              dispatch(setAllJobs(res.data.jobs));
          }
      } catch (error) {
          console.log(error);
      }
  }
  fetchAllJobs();
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [dispatch, navigate, user?.role]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home