import React from 'react'
import "./Membership.css";
import { useNavigate } from 'react-router-dom';
function Membership() {
  const navigate = useNavigate();
  return (
   
    <div>
      {/* <section class="wrapper"> */}
  <div class="container " style={{ paddingTop: "100px" }}>

  <div class="row">
   
   <div class="col-sm-12 col-md-6 col-lg-4 mb-4"><div class="card-new card text-dark card-has-bg click-col" style={{
  backgroundImage: "url('https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1200&q=80')"
}}>
         <img class="card-img d-none" src="https://source.unsplash.com/600x900/?tree,nature" alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?"/>
        <div class="card-img-overlay d-flex flex-column">
         <div class="card-body text-center">
            <h4 class="card-title mt-0 "><a class="text-dark" herf="https://creativemanner.com">BASIC PLAN</a></h4>
           <small><i class="far fa-clock"></i>most affodable plan for a regular customer</small>
          </div>
         <h4 class="card-title mt-0 text-center pb-3">
             <h4 class="text-dark text-decoration-none">₹499</h4>
        </h4>


        <div class="card-footer">
          <div class="d-flex justify-content-center">
            <button onClick={() => navigate('/register')} type="button" class="btn btn-dark">BUY</button>
          </div>
      </div>

        </div>
      </div></div>


        <div class="col-sm-12 col-md-6 col-lg-4 mb-4"><div class="card-new card text-dark card-has-bg click-col" style={{
  backgroundImage: "url('https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1200&q=80')"
}}>
         <img class="card-img d-none" src="https://source.unsplash.com/600x900/?tree,nature" alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?"/>
        <div class="card-img-overlay d-flex flex-column">
         <div class="card-body text-center">
            <h4 class="card-title mt-0 "><a class="text-dark" herf="https://creativemanner.com">PREMIUM PLAN</a></h4>
           <small><i class="far fa-clock"></i>most affodable plan for a monthly customer</small>
          </div>
         <h4 class="card-title mt-0 text-center pb-3">
             <h4 class="text-dark text-decoration-none">₹999</h4>
        </h4>


        <div class="card-footer">
          <div class="d-flex justify-content-center">
            <button onClick={() => navigate('/register')} type="button" class="btn btn-dark">BUY</button>
          </div>
      </div>

        </div>
      </div></div>


        <div class="col-sm-12 col-md-6 col-lg-4 mb-4"><div class="card-new card text-dark card-has-bg click-col" style={{
  backgroundImage: "url('https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1200&q=80')"
}}>
         <img class="card-img d-none" src="https://source.unsplash.com/600x900/?tree,nature" alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?"/>
        <div class="card-img-overlay d-flex flex-column">
         <div class="card-body text-center">
            <h4 class="card-title mt-0 "><a class="text-dark" herf="https://creativemanner.com">STANDARD PLAN</a></h4>
           <small><i class="far fa-clock"></i>most affodable plan for a YEARLY customer</small>
          </div>
         <h4 class="card-title mt-0 text-center pb-3">
            <h4 class="text-dark text-decoration-none">₹1599</h4>
        </h4>


        <div class="card-footer">
          <div class="d-flex justify-content-center">
            <button onClick={() => navigate('/register')} type="button" class="btn btn-dark">BUY</button>
          </div>
      </div>

        </div>
      </div></div>

      
    


  {/* <div class="col-sm-12 col-md-6 col-lg-4 mb-4"><div class="card text-dark card-has-bg click-col"style={{
  backgroundImage: "url('https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1200&q=80')"
}}>
         <img class="card-img d-none" src="https://source.unsplash.com/600x900/?computer,design" alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?"/>
        <div class="card-img-overlay d-flex flex-column">
         <div class="card-body">
            <small class="card-meta mb-2">Thought Leadership</small>
            <h4 class="card-title mt-0 "><a class="text-dark" herf="https://creativemanner.com">Design Studio Lorem Ipsum Sit Amet Consectetur dipisi?</a></h4>
           <small><i class="far fa-clock"></i> October 15, 2020</small>
          </div>
          <div class="card-footer">
           <div class="media">
  <img class="mr-3 rounded-circle" src="https://assets.codepen.io/460692/internal/avatars/users/default.png?format=auto&version=1688931977&width=80&height=80" alt="Generic placeholder image" style={{maxwidth:"50px"}}/>
  <div class="media-body">
    <h6 class="my-0 text-dark d-block">Oz Coruhlu</h6>
     <small>Director of UI/UX</small>
  </div>
</div>
          </div>
        </div>
      </div></div> */}
   
    
  
  </div>
</div>
  {/* </section> */}
</div>


  
  )
}

export default Membership
