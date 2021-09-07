export default function Footer({username, caption}) {
    return (
      <div className="post-footer-container" style={{marginBottom:'1rem'}}>
          <span style={{marginRight: '0.25rem'}}><b>{username}</b></span>
          <span><i>{caption}</i></span>
      </div>
    );
}
