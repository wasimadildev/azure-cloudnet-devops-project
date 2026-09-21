const componentDetails = {
  internet: { icon: '◎', title: 'Internet', description: 'Public traffic enters through the application edge, where TLS is terminated and web requests are filtered before reaching private workloads.', specs: ['ROLE|Ingress', 'ACCESS|Public', 'FLOW|Inbound'] },
  gateway: { icon: '▣', title: 'Application Gateway + WAF', description: 'The public-facing edge balances HTTP traffic, terminates TLS, and protects the application surface with web application firewall rules.', specs: ['ROLE|Edge proxy', 'ACCESS|Public', 'FLOW|Inbound'] },
  firewall: { icon: '⛨', title: 'Azure Firewall', description: 'Central inspection for hub-and-spoke traffic. User-defined routes send controlled east-west and north-south flows through this security boundary.', specs: ['ROLE|Inspection', 'ACCESS|Private', 'FLOW|Bidirectional'] },
  web: { icon: '◫', title: 'Production Web VM', description: 'The frontend subnet hosts the Nginx web tier. It accepts only the application traffic permitted by the frontend NSG.', specs: ['SUBNET|10.10.1.0/24', 'ROLE|Frontend', 'ACCESS|Private'] },
  api: { icon: '◉', title: 'Production API VM', description: 'The backend tier runs inside a private subnet. Application calls arrive from the frontend and continue privately to managed data services.', specs: ['SUBNET|10.10.2.0/24', 'ROLE|Backend', 'ACCESS|Private'] },
  data: { icon: '◌', title: 'Private Endpoint', description: 'A private endpoint maps managed PostgreSQL or Storage into the production VNet without exposing the data service to the public internet.', specs: ['SUBNET|10.10.30.0/24', 'ROLE|Data', 'ACCESS|Private'] },
  'dev-web': { icon: '◫', title: 'Development Web VM', description: 'An isolated frontend workload in the development spoke. VNet peering enables controlled connectivity without overlapping address spaces.', specs: ['SUBNET|10.20.1.0/24', 'ROLE|Frontend', 'ACCESS|Private'] },
  'dev-api': { icon: '◉', title: 'Development API VM', description: 'A private API workload for testing changes before promotion to production. Access is limited by subnet security policy.', specs: ['SUBNET|10.20.2.0/24', 'ROLE|Backend', 'ACCESS|Private'] }
};

const title = document.querySelector('#detail-title');
const description = document.querySelector('#detail-description');
const icon = document.querySelector('#detail-icon');
const specs = document.querySelector('#detail-specs');
const diagram = document.querySelector('.diagram');

function selectComponent(node) {
  const detail = componentDetails[node.dataset.node];
  if (!detail) return;
  document.querySelectorAll('.node.selected').forEach((selected) => selected.classList.remove('selected'));
  node.classList.add('selected');
  icon.textContent = detail.icon;
  title.textContent = detail.title;
  description.textContent = detail.description;
  specs.innerHTML = detail.specs.map((item) => {
    const [label, value] = item.split('|');
    return `<span>${label}<b>${value}</b></span>`;
  }).join('');
}

document.querySelectorAll('.node').forEach((node) => {
  node.addEventListener('click', () => selectComponent(node));
  node.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectComponent(node);
    }
  });
});

document.querySelectorAll('[data-mode]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-mode]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    diagram.className = `diagram ${button.dataset.mode === 'all' ? '' : `mode-${button.dataset.mode}`}`;
  });
});

selectComponent(document.querySelector('[data-node="internet"]'));
