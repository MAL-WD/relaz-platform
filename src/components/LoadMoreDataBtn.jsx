const LoadMoreDataBtn = ({state,fetchDataFun,additionalParam}) => {
    if(state !== null && state.totalDocs>state.results.length ){
        return ( 
            <button onClick={()=>fetchDataFun({...additionalParam,page:state.page + 1})} className="text-white bg-main-dark p-3 px-4 mx-auto mt-6 hover:bg-main-dark rounded-full flex items-center gap-2">Load more</button>
         );
        
    }
}
 
export default LoadMoreDataBtn;