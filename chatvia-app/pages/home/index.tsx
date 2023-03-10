import React from 'react'
import { signOut } from 'next-auth/react'
import { NextPage } from 'next'

import styles from './home.module.css'
import Message from '@/components/message/message'
import ChatMessage from '@/components/chat-message/chat-message'
import ChatFooter from '@/components/chat-footer/chat-footer'
import ChatDetail from '@/components/chat-detail/chat-detail'
import { WithAuthentication } from '@/interfaces/auth'
// import authOptions from '@/pages/api/auth/[...nextauth]'

// interface Props {
//   csrfToken?: any;
// }

const Home: WithAuthentication<NextPage> = () => {

  return (
    <div className={styles.app}>

      {/* <input type="hidden" value={csrfToken} /> */}
      <button onClick={async () => { await signOut(); window.location.href = '/login' }}>Sign Out</button>

      <div className={styles.header}>
        <div className={styles.logo}>
          <svg viewBox="0 0 513 513" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M256.025.05C117.67-2.678 3.184 107.038.025 245.383a240.703 240.703 0 0085.333 182.613v73.387c0 5.891 4.776 10.667 10.667 10.667a10.67 10.67 0 005.653-1.621l59.456-37.141a264.142 264.142 0 0094.891 17.429c138.355 2.728 252.841-106.988 256-245.333C508.866 107.038 394.38-2.678 256.025.05z" />
            <path d="M330.518 131.099l-213.825 130.08c-7.387 4.494-5.74 15.711 2.656 17.97l72.009 19.374a9.88 9.88 0 007.703-1.094l32.882-20.003-10.113 37.136a9.88 9.88 0 001.083 7.704l38.561 63.826c4.488 7.427 15.726 5.936 18.003-2.425l65.764-241.49c2.337-8.582-7.092-15.72-14.723-11.078zM266.44 356.177l-24.415-40.411 15.544-57.074c2.336-8.581-7.093-15.719-14.723-11.078l-50.536 30.744-45.592-12.266L319.616 160.91 266.44 356.177z" fill="#fff" /></svg>
        </div>
        <div className={styles.search_bar}>
          <input type="text" placeholder="Search..." />
        </div>
        <div className={styles.user_settings}>
          <div className={styles.dark_light}>
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
          </div>
          <div className={styles.settings}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
          </div>
          <img className={`${styles.user_profile} ${styles.account_profile}`} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.conversation_area}>

          <Message isOnline={true} userName="Madison Jones" message='What time was our meet' date='20m'
            avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png' />

          <Message userName="Miguel Cohen" message='Adaptogen taiyaki austin jean shorts brunch'
            date='20m'
            avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png' />

          <Message isActive={true} isGroup={true} userName="CodePen Group" message='Aysenur: I love CSS'
            date='28m' />

          <Message isOnline={true} userName="Lea Debere" message='Shoreditch iPhone jianbingh'
            date='45m'
            avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png' />

          <Message isOnline={true} userName="Jordan Smith" message='Snackwave craft beer raclette, beard kombucha'
            date='2h'
            avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29+%281%29.png' />

          <Message isOnline={false} userName="Jared Jackson" message='Tattooed brooklyn typewriter gastropub'
            date='18m'
            avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%284%29+%281%29.png' />

          <Message isOnline={true} userName="Henry Clark" message='Ethical typewriter williamsburg lo-fi street art'
            date='2h'
            avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png' />

          <Message isOnline={false} userName="Jason Mraz" message="I'm lucky I'm in love with my best friend"
            date='4h'
            avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/qs6F3dgm.png' />

          <Message isOnline={false} userName="Chiwa Lauren" message="Pabst af 3 wolf moon"
            date='28m'
            avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%288%29.png' />

          <Message isOnline={false} userName="Caroline Orange" message="Bespoke aesthetic lyft woke cornhole"
            date='35m'
            avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%289%29.png' />

          <Message isOnline={false} userName="Lina Ashma" message="Migas food truck crucifix vexi"
            date='42m'
            avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%286%29.png' />

          <button className={styles.add}></button>
          <div className={styles.overlay}></div>
        </div>
        <div className={styles.chat_area}>
          <div className={styles.chat_area_header}>
            <div className={styles.chat_area_title}>CodePen Group</div>
            <div className={styles.chat_area_group}>
              <img className={styles.chat_area_profile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
              <img className={styles.chat_area_profile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="" />
              <img className={styles.chat_area_profile} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />
              <span>+4</span>
            </div>
          </div>
          <div className={styles.chat_area_main}>
            <ChatMessage dateSeen='1.22pm' avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png'>
              <div className={styles.chat_msg_text}>Luctus et ultrices posuere cubilia curae.</div>
              <div className={styles.chat_msg_text}>
                <img src="https://media0.giphy.com/media/yYSSBtDgbbRzq/giphy.gif?cid=ecf05e47344fb5d835f832a976d1007c241548cc4eea4e7e&rid=giphy.gif" /></div>
              <div className={styles.chat_msg_text}>Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Pretium lectus quam id leo.</div>
            </ChatMessage>

            <ChatMessage isOwner={true} avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png'
              dateSeen='1.22pm'>
              <div className={styles.chat_msg_text}>Sit amet risus nullam eget felis eget. Dolor sed viverra ipsum😂😂😂</div>
              <div className={styles.chat_msg_text}>Cras mollis nec arcu malesuada tincidunt.</div>
            </ChatMessage>

            <ChatMessage avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png'
              dateSeen='2.45pm'>
              <div className={styles.chat_msg_text}>Aenean tristique maximus tortor non tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae😊</div>
              <div className={styles.chat_msg_text}>Ut faucibus pulvinar elementum integer enim neque volutpat.</div>
            </ChatMessage>

            <ChatMessage avatarSrc='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png'
              dateSeen='2.50pm'>
              <div className={styles.chat_msg_text}>posuere eget augue sodales, aliquet posuere eros.</div>
              <div className={styles.chat_msg_text}>Cras mollis nec arcu malesuada tincidunt.</div>
            </ChatMessage>

          </div>

          <ChatFooter />

        </div>

        <ChatDetail />

      </div>
    </div>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOptions as unknown as NextAuthOptions);
//   const csrfToken = await getCsrfToken(context);
//   console.log("session home========", session);

//   if (session) {
//     return {
//       props: {
//         // session,
//         csrfToken,
//       },
//     }
//   }
//   return {
//     props: { csrfToken: '' },
//   };
// }

//Home.auth = true;
Home.requiresAuthentication = {
  //role: "admin",
  //loading: <AdminLoadingSkeleton />,
  //unauthorized: "/login", // redirect to this url
}

export default Home