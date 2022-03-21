resource "aws_iam_role" "cluster_service_role" {
  name = "ClusterServiceRole"
  description           = "Allows access to other AWS service resources that are required to operate clusters managed by EKS."
  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "eks.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    tag-key = "eks"
  }
}

resource "aws_iam_role_policy_attachment" "cluster_iam_attach" {
  role       = aws_iam_role.cluster_service_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}