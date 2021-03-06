import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useTransition } from '../src/context/transitionContext';
import EventCard from '../src/components/EventCard';
import MailchimpForm from '../src/components/MailchimpForm';

// Remover depois de conectar com firebase
import { futureEvents as databaseEvents } from '../src/constants/mockEvents';
//

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .header{
    background-image: url('/brush-stroke-banner-6.svg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    h2{
      font-family: 'Chau Philomene One', sans-serif;
      color: #47453c;
      font-size: 4.5rem;
    }
  }
  .no-events{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .warning{
      font-size: 2rem;
      width: 80%;
    }
  }
`;

const Cover = styled.div`
  width: 100vw;
  height: ${(props) => props.heigth};
  margin: 0 0 50px 0;
  background-image: url(${(props) => props.coverUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 100% 25%;
  mask-image: url(${(props) => props.pathUrl});
  mask-repeat: no-repeat;
  mask-position: center center;
  mask-size: cover;
  h2 {
    font-family: 'Otomanopee One', sans-serif;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -25%);
    text-align: center;
    width: 50vw;
    color: white;
    font-size: 2.5rem;
  }
`;

export async function getStaticProps() {
  const nextEvents = databaseEvents;

  return {
    props: {
      nextEvents,
    },
    revalidate: 60,
  };
}

const meses = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export default function Calendario({ nextEvents }) {
  const {
    setTransitionTo,
    setTransitionOpen,
  } = useTransition();

  function compareDates(event1, event2) {
    const date1 = event1.eventDate;
    const ano1 = 366 * date1.ano;
    const mes1 = 31 * meses.indexOf(date1.mes.toLowerCase()) + 1;
    const totalDate1 = ano1 + mes1 + date1.dia;

    const date2 = event2.eventDate;
    const ano2 = 366 * date2.ano;
    const mes2 = 31 * meses.indexOf(date2.mes.toLowerCase()) + 1;
    const totalDate2 = ano2 + mes2 + date2.dia;

    return totalDate1 - totalDate2;
  }

  useEffect(() => {
    nextEvents.sort(compareDates);
    setTransitionOpen(true);
    setTransitionTo('header');
  }, []);

  return (
    <Container>
      <Cover coverUrl="/home-cover4.jpg" pathUrl="/home-cover-clip-path.svg" heigth="600px">
        <div>
          <h2>
            {`Fique por dentro de todas as datas 
            da Voos e não perca um segundo de emoção`}
          </h2>
        </div>
      </Cover>
      <div className="header">
        <h2>Próximos eventos:</h2>
      </div>
      {nextEvents.length > 0 && nextEvents.map((event) => (
        <EventCard
          key={event.eventName}
          img={event.logoImg}
          name={event.eventName}
          href={`/nextEvents/${event.eventPageHref}`}
          backgroundImg={event.cardCoverImg}
          eventTheme={event.eventTheme}
          dia={event.eventDate.dia}
          mes={event.eventDate.mes}
          ano={event.eventDate.ano}
        />
      ))}

      {nextEvents.length === 0 && (
        <div className="no-events">
          <h3 className="warning">
            Estamos dando um intervalo nos trabalhos, mas logo voltaremos com muito mais!
          </h3>
          <MailchimpForm />
        </div>
      )}
    </Container>
  );
}
