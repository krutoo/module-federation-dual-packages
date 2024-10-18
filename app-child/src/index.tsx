import './logger';

const styles = {
  background: '#00ff0033',
  padding: '16px',
  borderRadius: '8px',
};

function Child({ name }: { name?: string }) {
  return <div style={styles}>Child App ({name ?? 'unknown'})</div>;
}

export default Child;
