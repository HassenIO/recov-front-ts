import React, { useState, useEffect } from 'react';
import IFilters from './types/IFilters';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './Reco.css';

interface IProps {
  filters: IFilters;
}

const getColumns = (domaine?: string) => [
  {
    Header: 'Avocat',
    accessor: 'AvocatId',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left' }
  },
  {
    Header: 'Score',
    accessor: 'Critères',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left' }
  },
  {
    Header: `Nb Missions "${domaine || ''}"`,
    accessor: 'nb_missions',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left' }
  },
  {
    Header: 'Partenariat',
    accessor: 'partenariat',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left' }
  },
  {
    Header: 'Coût moyen',
    accessor: 'cout',
    headerStyle: { textAlign: 'left' },
    style: { textAlign: 'left' }
  }
];

const Reco: React.SFC<IProps> = (props: IProps) => {
  const [filters, setFilters] = useState<IFilters>({
    compTerit: '',
    specialite: '',
    domaine: ''
  });
  const [reco, setReco] = useState([]);
  const [recoTable, setRecoTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const buildRecoTable = (reco: any) => {
    return reco.map((r: any) => {
      const nbMissions = r[`nb_missions_${filters.domaine}`];
      return {
        AvocatId: r.nameAvocat ? (
          <span className="avocat-name">{r.nameAvocat}</span>
        ) : (
          <em className="avocat-id">{r.AvocatId}</em>
        ),
        Critères: Math.floor(r.Critères * 100),
        nb_missions: nbMissions === 0 ? '-' : nbMissions,
        partenariat:
          r.Partenaire === 'Y' ? (
            'Partenaire'
          ) : (
            <span className="not-partner">Non partenaire</span>
          ),
        cout: `${Math.floor(r.Côut * 100) / 100.0} €`
      };
    });
  };

  const fetchReco = (
    compTerit: string,
    specialite: string,
    domaine: string
  ) => {
    setLoading(true);
    fetch(
      `https://v86y9ouqxb.execute-api.eu-west-1.amazonaws.com/dev/reco?compTerit=${encodeURIComponent(
        compTerit
      )}&specialite=${encodeURIComponent(
        specialite
      )}&domaine=${encodeURIComponent(domaine)}`
    )
      .then(res => res.json())
      .then(res => {
        setReco(res);
        setRecoTable(buildRecoTable(res));
        setLoading(false);
      });
  };

  useEffect(
    () => {
      setFilters(props.filters);
      if (
        props.filters.compTerit &&
        props.filters.specialite &&
        props.filters.domaine
      )
        fetchReco(
          props.filters.compTerit,
          props.filters.specialite,
          props.filters.domaine
        );
    },
    [props.filters]
  );

  return (
    <div className="Reco">
      <ReactTable
        columns={getColumns(filters.domaine)}
        data={recoTable}
        defaultPageSize={10}
        noDataText="Aucun résultat"
        ofText="sur"
        rowsText="lignes"
        previousText="Précédents"
        nextText="Suivants"
        loadingText="Chargement..."
        loading={loading}
      />
    </div>
  );
};

export default Reco;
