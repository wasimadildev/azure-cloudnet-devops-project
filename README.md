# Azure CloudNet DevOps Platform

Production-style Azure networking and DevOps platform built incrementally from a clean VNet foundation to a secure, automated hub-and-spoke architecture.

## Project status

| Part | Focus | Status |
| --- | --- | --- |
| 01 | Azure VNet foundation and subnetting | Complete |
| 02 | Ubuntu VMs and private VNet communication | Complete |
| 03 | Azure NSGs and network security | Complete |
| 04 | VM-to-VM private communication and backend NSG rules | Complete |
| 05 | Azure routing and route tables | Complete |
| 06 | Azure NAT Gateway and outbound connectivity | Complete |
| 07 | Azure Load Balancer and health probes | Complete |
| 08 | Second VNet and environment isolation | Complete |
| 09 | Azure Private Endpoint and Private Link | Complete |
| 10 | Azure Private DNS and VNet links | Complete |
| 11–18 | Monitoring, Terraform, and CI/CD | Planned |

Open the interactive lessons:

- [Part 01: Build the foundation](docs/part-01-foundation.html)
- [Part 02: Deploy Ubuntu VMs](docs/part-02-vms.html)
- [Part 03: Azure NSG and network security](docs/part-03-nsg.html)
- [Part 04: VM-to-VM private communication](docs/part-04-private-communication.html)
- [Part 05: Azure routing and route tables](docs/part-05-routing.html)
- [Part 06: Azure NAT Gateway and outbound connectivity](docs/part-06-nat.html)
- [Part 07: Azure Load Balancer](docs/part-07-load-balancer.html)
- [Part 08: Second VNet](docs/part-08-second-vnet.html)
- [Part 09: Azure Private Endpoint](docs/part-09-private-endpoint.html)
- [Part 10: Azure Private DNS](docs/part-10-private-dns.html)
- [Architecture overview](index.html)

## Architecture direction

The final platform follows a hub-and-spoke design:

```text
Internet
   |
Application Gateway + WAF
   |
Hub VNet 10.0.0.0/16
   |
Azure Firewall
   +-----------------------------+
   |                             |
Production spoke              Development spoke
10.10.0.0/16                  10.20.0.0/16
   |                             |
Frontend / Backend             Frontend / Backend
   |
Private Endpoint
   |
PostgreSQL / Storage
```

The first two parts establish the production VNet and attach two Ubuntu workloads:

```text
vnet-cloudnet-prod 10.10.0.0/16
├── snet-frontend  10.10.1.0/24  -> vm-web-01
├── snet-backend   10.10.2.0/24  -> vm-api-01
├── snet-database  10.10.3.0/24
└── snet-management 10.10.10.0/24
```

## Part 01: Foundation

Created resources:

- Resource group: `rg-cloudnet-prod`
- VNet: `vnet-cloudnet-prod`
- Address space: `10.10.0.0/16`
- Frontend subnet: `snet-frontend` / `10.10.1.0/24`
- Backend subnet: `snet-backend` / `10.10.2.0/24`
- Database subnet: `snet-database` / `10.10.3.0/24`
- Management subnet: `snet-management` / `10.10.10.0/24`

Part 01 focuses on address planning, professional resource naming, Azure Portal creation, Azure CLI, and the relationship between subscription, resource group, VNet, and subnet.

## Part 02: Compute and private networking

Two Ubuntu VMs are placed in separate subnets inside the same VNet:

- `vm-web-01` in `snet-frontend`
- `vm-api-01` in `snet-backend`

The lesson covers NIC ownership, private versus public IP addresses, Azure DHCP behavior, Azure's five reserved subnet addresses, Linux network inspection, route tables, DNS, listening ports, and private HTTP communication between the VMs.

Public IPs are used temporarily for SSH during the learning lab. The target production architecture removes public access from backend and data workloads and introduces Bastion, NSGs, Application Gateway, private endpoints, private DNS, NAT Gateway, and Azure Firewall.

## Technologies

- Microsoft Azure
- Azure Virtual Network
- Linux / Ubuntu
- Nginx
- Node.js
- PostgreSQL
- Docker
- Terraform
- GitHub Actions
- Azure Monitor
- Network Watcher

## Azure networking roadmap

- Virtual Network and subnetting
- Network Security Groups
- Route Tables and User Defined Routes
- Public and private IP addressing
- NAT Gateway
- Azure Bastion
- Azure Load Balancer
- Application Gateway
- Web Application Firewall
- VNet peering
- Private Endpoint and Private Link
- Private DNS
- Azure Firewall
- Hub-and-spoke architecture
- Monitoring and Network Watcher

## DevOps roadmap

- Infrastructure as Code with Terraform
- Reusable environment configuration
- Dockerized frontend and backend services
- Linux administration
- GitHub Actions CI/CD
- Validation, security checks, and deployment workflows
- Azure monitoring and operational documentation

## Repository structure

```text
azure-cloudnet-devops-project/
├── README.md
├── docs/
│   ├── architecture/
│   ├── networking/
│   ├── screenshots/
│   ├── part-01-foundation.html
│   ├── part-01.css
│   ├── part-01.js
│   ├── part-02-vms.html
│   ├── part-02.css
│   └── part-02.js
├── terraform/
├── scripts/
│   ├── azure-cli/
│   └── linux/
├── application/
│   ├── frontend/
│   └── backend/
├── docker/
└── .github/
    └── workflows/
```

## Local documentation

The documentation pages are static HTML and do not need a build tool. Open `index.html` in a browser, or serve the project locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Learning principle

Every part adds one meaningful layer to the same platform. The project favors observable evidence over memorized commands: inspect the resource, verify the address, test the path, document the result, then add the next capability.
