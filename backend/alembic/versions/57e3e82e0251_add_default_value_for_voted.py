"""add default value for voted

Revision ID: 57e3e82e0251
Revises: 45ad12bad576
Create Date: 2022-11-22 18:04:28.296471

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '57e3e82e0251'
down_revision = '45ad12bad576'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('answer', 'voted',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('answer', 'voted',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
